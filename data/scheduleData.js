const staticScheduleData = {
  "startDate": "2026-03-02",
  "endDate": "2026-07-10",
  "defaultWeekly": {
    "Monday": [
      { "time": "17:45 - 20:50", "subject": "Cryptography and Information Security", "room": "B.T6/L4", "lecturer": "Darwin, S.Kom., M.Kom." }
    ],
    "Tuesday": [
      { "time": "17:45 - 20:50", "subject": "Game Application Development", "room": "B.T6/L4", "lecturer": "Fandi Presly Simamora, S.Kom., M.Kom." }
    ],
    "Wednesday": [
       { "time": "17:45 - 20:50", "subject": "Computer Vision", "room": "B.T6/L4", "lecturer": "Kenny Calnelius Winata, S.Kom., M.Kom." }
    ],
    "Thursday": [
       { "time": "17:45 - 19:05", "subject": "Character Development: Citizenship", "room": "B.T6/L4", "lecturer": "Drs. Indra Muda, M.A.P." },
       { "time": "19:30 - 20:50", "subject": "Character Development: Pancasila", "room": "B.T6/L4", "lecturer": "Hamonangan Simamora, S.Pd., M.M." }
    ],
    "Friday": [
       { "time": "17:45 - 20:50", "subject": "Cloud Computing", "room": "B.T6/L4", "lecturer": "Ivan Dika Lesmana, S.Kom., M.Kom." }
    ],
    "Saturday": [],
    "Sunday": []
  },
  "overrides": {
    // === MARCH ===
    "2026-03-09": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Cryptography and Information Security", "room": "Ms. Teams", "lecturer": "Darwin, S.Kom., M.Kom." } ] },
    "2026-03-10": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Game Application Development", "room": "Ms. Teams", "lecturer": "Fandi Presly Simamora, S.Kom., M.Kom." } ] },
    "2026-03-11": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Computer Vision", "room": "Ms. Teams", "lecturer": "Kenny Calnelius Winata, S.Kom., M.Kom." } ] },
    "2026-03-16": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Cryptography and Information Security", "room": "Ms. Teams", "lecturer": "Darwin, S.Kom., M.Kom." } ] },
    "2026-03-17": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Game Application Development", "room": "Ms. Teams", "lecturer": "Fandi Presly Simamora, S.Kom., M.Kom." } ] },
    "2026-03-19": { "status": "Libur", "classes": [] },
    "2026-03-20": { "status": "Libur", "classes": [] },
    "2026-03-23": { "status": "Libur", "classes": [] },
    "2026-03-24": { "status": "Libur", "classes": [] },
    "2026-03-25": { "status": "Libur", "classes": [] },
    "2026-03-27": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Cloud Computing", "room": "Ms. Teams", "lecturer": "Ivan Dika Lesmana, S.Kom., M.Kom." } ] },
    "2026-03-31": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Game Application Development", "room": "Ms. Teams", "lecturer": "Fandi Presly Simamora, S.Kom., M.Kom." } ] },

    // === APRIL ===
    "2026-04-02": { "status": "Online", "classes": [ { "time": "17:45 - 19:05", "subject": "Character Development: Citizenship", "room": "Ms. Teams", "lecturer": "Drs. Indra Muda, M.A.P." }, { "time": "19:30 - 20:50", "subject": "Character Development: Pancasila", "room": "Ms. Teams", "lecturer": "Hamonangan Simamora, S.Pd., M.M." } ] },
    "2026-04-03": { "status": "Libur", "classes": [] },
    "2026-04-09": { "status": "Online", "classes": [ { "time": "17:45 - 19:05", "subject": "Character Development: Citizenship", "room": "Ms. Teams", "lecturer": "Drs. Indra Muda, M.A.P." }, { "time": "19:30 - 20:50", "subject": "Character Development: Pancasila", "room": "Ms. Teams", "lecturer": "Hamonangan Simamora, S.Pd., M.M." } ] },
    "2026-04-10": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Cloud Computing", "room": "Ms. Teams", "lecturer": "Ivan Dika Lesmana, S.Kom., M.Kom." } ] },
    "2026-04-15": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Computer Vision", "room": "Ms. Teams", "lecturer": "Kenny Calnelius Winata, S.Kom., M.Kom." } ] },
    "2026-04-16": { "status": "Online", "classes": [ { "time": "17:45 - 19:05", "subject": "Character Development: Citizenship", "room": "Ms. Teams", "lecturer": "Drs. Indra Muda, M.A.P." }, { "time": "19:30 - 20:50", "subject": "Character Development: Pancasila", "room": "Ms. Teams", "lecturer": "Hamonangan Simamora, S.Pd., M.M." } ] },
    "2026-04-22": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Computer Vision", "room": "Ms. Teams", "lecturer": "Kenny Calnelius Winata, S.Kom., M.Kom." } ] },
    "2026-04-24": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Cloud Computing", "room": "Ms. Teams", "lecturer": "Ivan Dika Lesmana, S.Kom., M.Kom." } ] },
    "2026-04-27": { "status": "Minggu Tenang", "classes": [] },
    "2026-04-28": { "status": "Offline", "classes": [ { "time": "17:45 - 20:50", "subject": "Cloud Computing (Replacement for Apr 3)", "room": "B.T6/L4", "lecturer": "Ivan Dika Lesmana, S.Kom., M.Kom." } ] },
    "2026-04-29": { "status": "Minggu Tenang", "classes": [] },
    "2026-04-30": { "status": "Minggu Tenang", "classes": [] },

    // === MAY ===
    "2026-05-01": { "status": "Libur", "classes": [] },
    "2026-05-04": { "status": "UTS", "classes": [ { "time": "TBA", "subject": "Midterm Exam", "room": "TBA", "lecturer": "Invigilator" } ] },
    "2026-05-05": { "status": "UTS", "classes": [ { "time": "TBA", "subject": "Midterm Exam", "room": "TBA", "lecturer": "Invigilator" } ] },
    "2026-05-06": { "status": "UTS", "classes": [ { "time": "TBA", "subject": "Midterm Exam", "room": "TBA", "lecturer": "Invigilator" } ] },
    "2026-05-07": { "status": "UTS", "classes": [ { "time": "TBA", "subject": "Midterm Exam", "room": "TBA", "lecturer": "Invigilator" } ] },
    "2026-05-08": { "status": "UTS", "classes": [ { "time": "TBA", "subject": "Midterm Exam", "room": "TBA", "lecturer": "Invigilator" } ] },
    "2026-05-14": { "status": "Libur", "classes": [] },
    "2026-05-20": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Computer Vision", "room": "Ms. Teams", "lecturer": "Kenny Calnelius Winata, S.Kom., M.Kom." } ] },
    "2026-05-26": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Game Application Development", "room": "Ms. Teams", "lecturer": "Fandi Presly Simamora, S.Kom., M.Kom." } ] },
    "2026-05-27": { "status": "Libur", "classes": [] },
    "2026-05-29": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Cloud Computing", "room": "Ms. Teams", "lecturer": "Ivan Dika Lesmana, S.Kom., M.Kom." } ] },

    // === JUNE ===
    "2026-06-01": { "status": "Libur", "classes": [] },
    "2026-06-02": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Game Application Development", "room": "Ms. Teams", "lecturer": "Fandi Presly Simamora, S.Kom., M.Kom." } ] },
    "2026-06-04": { "status": "Online", "classes": [ { "time": "17:45 - 19:05", "subject": "Character Development: Citizenship", "room": "Ms. Teams", "lecturer": "Drs. Indra Muda, M.A.P." }, { "time": "19:30 - 20:50", "subject": "Character Development: Pancasila", "room": "Ms. Teams", "lecturer": "Hamonangan Simamora, S.Pd., M.M." } ] },
    "2026-06-08": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Cryptography and Information Security", "room": "Ms. Teams", "lecturer": "Darwin, S.Kom., M.Kom." } ] },
    "2026-06-11": { "status": "Online", "classes": [ { "time": "17:45 - 19:05", "subject": "Character Development: Citizenship", "room": "Ms. Teams", "lecturer": "Drs. Indra Muda, M.A.P." }, { "time": "19:30 - 20:50", "subject": "Character Development: Pancasila", "room": "Ms. Teams", "lecturer": "Hamonangan Simamora, S.Pd., M.M." } ] },
    "2026-06-15": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Cryptography and Information Security", "room": "Ms. Teams", "lecturer": "Darwin, S.Kom., M.Kom." } ] },
    "2026-06-16": { "status": "Libur", "classes": [] },
    "2026-06-17": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Computer Vision", "room": "Ms. Teams", "lecturer": "Kenny Calnelius Winata, S.Kom., M.Kom." } ] },
    "2026-06-18": { "status": "Online", "classes": [ { "time": "17:45 - 19:05", "subject": "Character Development: Citizenship", "room": "Ms. Teams", "lecturer": "Drs. Indra Muda, M.A.P." }, { "time": "19:30 - 20:50", "subject": "Character Development: Pancasila", "room": "Ms. Teams", "lecturer": "Hamonangan Simamora, S.Pd., M.M." } ] },
    "2026-06-19": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Cloud Computing", "room": "Ms. Teams", "lecturer": "Ivan Dika Lesmana, S.Kom., M.Kom." } ] },
    "2026-06-23": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Game Application Development", "room": "Ms. Teams", "lecturer": "Fandi Presly Simamora, S.Kom., M.Kom." } ] },
    "2026-06-29": { "status": "Offline", "classes": [ { "time": "17:45 - 20:50", "subject": "Cryptography (Replacement for Jun 1)", "room": "B.T6/L4", "lecturer": "Darwin, S.Kom., M.Kom." } ] },
    "2026-06-30": { "status": "Offline", "classes": [ { "time": "17:45 - 20:50", "subject": "Game App Dev (Replacement for Jun 16)", "room": "B.T6/L4", "lecturer": "Fandi Presly Simamora, S.Kom., M.Kom." } ] },

    // === JULY ===
    "2026-07-01": { "status": "Online", "classes": [ { "time": "17:45 - 20:50", "subject": "Computer Vis (Replacement for May 27)", "room": "Ms. Teams", "lecturer": "Kenny Calnelius Winata, S.Kom., M.Kom." } ] },
    "2026-07-02": { "status": "Offline", "classes": [ { "time": "17:45 - 19:05", "subject": "Character Dev (Replacement May 14)", "room": "B.T6/L4", "lecturer": "Drs. Indra Muda, M.A.P." }, { "time": "19:30 - 20:50", "subject": "Character Dev (Replacement May 14)", "room": "B.T6/L4", "lecturer": "Hamonangan Simamora, S.Pd., M.M." } ] },
    "2026-07-03": { "status": "Minggu Tenang", "classes": [] },
    "2026-07-06": { "status": "UAS", "classes": [ { "time": "TBA", "subject": "Final Exam", "room": "TBA", "lecturer": "Invigilator" } ] },
    "2026-07-07": { "status": "UAS", "classes": [ { "time": "TBA", "subject": "Final Exam", "room": "TBA", "lecturer": "Invigilator" } ] },
    "2026-07-08": { "status": "UAS", "classes": [ { "time": "TBA", "subject": "Final Exam", "room": "TBA", "lecturer": "Invigilator" } ] },
    "2026-07-09": { "status": "UAS", "classes": [ { "time": "TBA", "subject": "Final Exam", "room": "TBA", "lecturer": "Invigilator" } ] },
    "2026-07-10": { "status": "UAS", "classes": [ { "time": "TBA", "subject": "Final Exam", "room": "TBA", "lecturer": "Invigilator" } ] }
  }
};
