/* =========================================================
   Casefile CAPTCHA — game logic
   ========================================================= */

(function () {
  "use strict";

  const CASES = window.CasefileData.CASES;
  const SFX = window.CasefileSFX;
  const ROUND_SECONDS = 30;

  // -- DOM refs -------------------------------------------------
  const el = {
    briefingScreen: document.getElementById("briefingScreen"),
    briefCaseNumber: document.getElementById("briefCaseNumber"),
    briefCaseTitle: document.getElementById("briefCaseTitle"),
    briefCaseSetup: document.getElementById("briefCaseSetup"),
    startBtn: document.getElementById("startBtn"),

    gameView: document.getElementById("gameView"),
    caseNumber: document.getElementById("caseNumber"),
    caseTitle: document.getElementById("caseTitle"),
    caseSetup: document.getElementById("caseSetup"),
    timerValue: document.getElementById("timerValue"),
    timerBox: document.querySelector(".case-timer"),
    progressPill: document.getElementById("progressPill"),
    toast: document.getElementById("feedbackToast"),
    sceneFrame: document.getElementById("sceneFrame"),
    checklist: document.getElementById("checklist"),
    restartBtn: document.getElementById("restartBtn"),
    newCaseBtn: document.getElementById("newCaseBtn"),
    submitBtn: document.getElementById("submitBtn"),

    soundToggle: document.getElementById("soundToggle"),
    soundIcon: document.getElementById("soundIcon"),

    resultOverlay: document.getElementById("resultOverlay"),
    resultCard: document.getElementById("resultCard"),
    resultKicker: document.getElementById("resultKicker"),
    resultHeadline: document.getElementById("resultHeadline"),
    resultExplain: document.getElementById("resultExplain"),
    resultScore: document.getElementById("resultScore"),
    resultNewCaseBtn: document.getElementById("resultNewCaseBtn"),
    resultRestartBtn: document.getElementById("resultRestartBtn"),
  };

  // -- State ------------------------------------------------------
  const state = {
    caseData: null,
    found: new Set(),
    secondsLeft: ROUND_SECONDS,
    timerId: null,
    misclicks: 0,
    ended: false,
  };

  let toastTimeoutId = null;

  function pickRandomCase() {
    const pool = CASES;
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
    // Note: repeats are allowed by design — "acceptable if the same
    // case appears twice in a row, just like a normal random CAPTCHA."
  }

  function clearTimer() {
    if (state.timerId !== null) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function formatTime(s) {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  }

  function startTimer() {
    clearTimer();
    el.timerBox.classList.remove("warning");
    el.timerValue.textContent = formatTime(state.secondsLeft);
    state.timerId = setInterval(() => {
      state.secondsLeft -= 1;
      el.timerValue.textContent = formatTime(Math.max(state.secondsLeft, 0));
      if (state.secondsLeft <= 10) {
        el.timerBox.classList.add("warning");
      }
      if (state.secondsLeft <= 0) {
        clearTimer();
        if (!state.ended) {
          endRound(false);
        }
      }
    }, 1000);
  }

  function showToast(message, kind) {
    el.toast.textContent = message;
    el.toast.classList.remove("show", "neutral");
    void el.toast.offsetWidth; // restart animation
    el.toast.classList.add("show");
    if (kind === "neutral") el.toast.classList.add("neutral");
    if (toastTimeoutId) clearTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(() => {
      el.toast.classList.remove("show");
    }, 1800);
  }

  function updateProgress() {
    const total = state.caseData.clues.length;
    el.progressPill.textContent = `${state.found.size} / ${total} clues found`;
    el.submitBtn.disabled = state.found.size < total || state.ended;
  }

  function renderChecklist() {
    el.checklist.innerHTML = "";
    state.caseData.clues.forEach((clue) => {
      const li = document.createElement("li");
      li.className = "checklist-item";
      li.id = `checklist-${clue.id}`;
      li.innerHTML = `<span class="box" aria-hidden="true"></span><span>${clue.label}</span>`;
      el.checklist.appendChild(li);
    });
  }

  function onHotspotActivate(node) {
    if (state.ended) return;
    const clueId = node.getAttribute("data-clue");
    const isRequired = node.getAttribute("data-required") === "true";

    if (!isRequired) {
      node.classList.add("shake");
      setTimeout(() => node.classList.remove("shake"), 400);
      showToast("Not a clue — keep looking.", "neutral");
      SFX.playMiss();
      return;
    }

    const alreadyFound = state.found.has(clueId);
    if (alreadyFound) {
      state.found.delete(clueId);
      node.classList.remove("selected");
      node.setAttribute("aria-pressed", "false");
      syncChecklistItem(clueId, false);
      SFX.playUnfound();
    } else {
      state.found.add(clueId);
      node.classList.add("selected");
      node.setAttribute("aria-pressed", "true");
      syncChecklistItem(clueId, true);
      showToast("Evidence logged.", "neutral");
      SFX.playFound();
    }
    updateProgress();
  }

  function syncChecklistItem(clueId, isFound) {
    const li = document.getElementById(`checklist-${clueId}`);
    if (li) li.classList.toggle("found", isFound);
  }

  function wireSceneInteractions() {
    const hotspots = el.sceneFrame.querySelectorAll(".hotspot");
    hotspots.forEach((node) => {
      node.addEventListener("click", () => onHotspotActivate(node));
      node.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " " || ev.key === "Spacebar") {
          ev.preventDefault();
          onHotspotActivate(node);
        }
      });
    });
  }

  function computeScore() {
    const timeBonus = Math.round((state.secondsLeft / ROUND_SECONDS) * 60);
    const accuracyBonus = Math.max(0, 40 - state.misclicks * 8);
    return Math.max(5, Math.min(100, timeBonus + accuracyBonus));
  }

  function endRound(success) {
    if (state.ended) return;
    state.ended = true;
    clearTimer();
    el.submitBtn.disabled = true;
    SFX.stopMusic();

    const score = computeScore();
    el.resultCard.classList.remove("pass", "fail");
    el.resultCard.classList.add(success ? "pass" : "fail");
    el.resultKicker.textContent = "VERIFICATION RESULT";
    el.resultHeadline.textContent = success
      ? "CASE SOLVED — VERIFICATION PASSED"
      : "CASE UNSOLVED — TRY AGAIN";
    el.resultExplain.textContent = state.caseData.reveal;
    el.resultScore.textContent = success
      ? `Detective Instinct score: ${score}/100 — a playful demo metric, not a security measure.`
      : `Clues found: ${state.found.size} / ${state.caseData.clues.length}. This is a gameplay result, not a real identity check.`;
    el.resultOverlay.hidden = false;

    if (success) {
      SFX.playSuccess();
    } else {
      SFX.playFail();
    }
    el.resultNewCaseBtn.focus();
  }

  // Prepares a case's state + scene, but does not start the timer.
  function prepareCase(caseData) {
    state.caseData = caseData;
    state.found = new Set();
    state.secondsLeft = ROUND_SECONDS;
    state.misclicks = 0;
    state.ended = false;

    el.resultOverlay.hidden = true;
    el.caseNumber.textContent = caseData.number;
    el.caseTitle.textContent = caseData.title;
    el.caseSetup.textContent = caseData.setup;
    el.sceneFrame.innerHTML = caseData.scene();
    renderChecklist();
    updateProgress();
    wireSceneInteractions();
    el.timerBox.classList.remove("warning");
    el.timerValue.textContent = formatTime(ROUND_SECONDS);
  }

  // Shows the briefing screen for a case; the timer waits for "Start Investigation".
  function showBriefing(caseData) {
    prepareCase(caseData);
    clearTimer();
    SFX.stopMusic();
    el.briefCaseNumber.textContent = caseData.number;
    el.briefCaseTitle.textContent = caseData.title;
    el.briefCaseSetup.textContent = caseData.setup;
    el.gameView.hidden = true;
    el.briefingScreen.hidden = false;
  }

  // Jumps straight into a timed round for the current case (used by Restart).
  function startRoundNow() {
    el.briefingScreen.hidden = true;
    el.gameView.hidden = false;
    startTimer();
    SFX.ensureCtx();
    SFX.startMusic();
  }

  function restartChallenge() {
    prepareCase(state.caseData);
    startRoundNow();
  }

  function newChallenge() {
    showBriefing(pickRandomCase());
  }

  // -- Wire up static controls ------------------------------------
  el.startBtn.addEventListener("click", () => {
    SFX.ensureCtx();
    SFX.playStart();
    startRoundNow();
  });

  el.submitBtn.addEventListener("click", () => {
    if (state.found.size === state.caseData.clues.length) {
      endRound(true);
    }
  });
  el.restartBtn.addEventListener("click", restartChallenge);
  el.newCaseBtn.addEventListener("click", newChallenge);
  el.resultRestartBtn.addEventListener("click", restartChallenge);
  el.resultNewCaseBtn.addEventListener("click", newChallenge);

  el.soundToggle.addEventListener("click", () => {
    SFX.ensureCtx();
    const nowMuted = SFX.toggleMuted();
    el.soundToggle.setAttribute("aria-pressed", String(nowMuted));
    el.soundIcon.textContent = nowMuted ? "\u{1F507}" : "\u{1F50A}";
  });

  // -- Boot ---------------------------------------------------------
  showBriefing(pickRandomCase());
})();
