// ============================================================
// SmartStudy v1.0 — Mock API for GitHub Pages Demo
// ============================================================
// Returns realistic demo data without a backend.
// Password: manarix2026
// ============================================================

const DEMO_USER = {
  student: { id: 1, username: 'arjun.kumar', role: 'student', linkedId: 1, firstName: 'Arjun', lastName: 'Kumar' },
  teacher: { id: 2, username: 'suresh.sir', role: 'teacher', linkedId: 1, firstName: 'Suresh', lastName: 'Sharma' },
  parent:  { id: 3, username: 'priya.kumar', role: 'parent', linkedId: 1, firstName: 'Priya', lastName: 'Kumar' },
  admin:   { id: 4, username: 'admin', role: 'admin', linkedId: 0, firstName: 'School', lastName: 'Admin' },
  principal: { id: 5, username: 'principal', role: 'principal', linkedId: 0, firstName: 'Dr. Meena', lastName: 'Verma' },
};

let currentUser = null;

class SmartStudyAPI {
  async request(method, path, body) {
    await new Promise(r => setTimeout(r, 200 + Math.random() * 300)); // simulate latency
    return this._route(method, path, body);
  }

  _route(method, path, body) {
    // Auth
    if (path === '/auth/login') return this._login(body);
    if (path === '/auth/logout') { currentUser = null; return { ok: true }; }
    if (path === '/auth/me') return { user: currentUser };

    // Student
    if (path === '/student/dashboard') return this._studentDashboard();
    if (path.startsWith('/student/mcq/practice')) return this._mcqPractice();
    if (path === '/student/mcq/answer') return this._mcqAnswer(body);
    if (path === '/student/sip') return this._sipScores();
    if (path === '/student/revisions') return this._revisions();
    if (path === '/student/doubts') return { doubts: [
      { id: 1, question: 'Why does photosynthesis need sunlight?', ai_response: 'Sunlight provides the energy needed to convert CO₂ and H₂O into glucose. The light reactions in chloroplasts use photons to split water molecules and create ATP.', status: 'resolved', created_at: '2026-03-19T10:30:00Z' },
      { id: 2, question: 'Difference between mitosis and meiosis?', ai_response: 'Mitosis produces 2 identical diploid cells (for growth/repair). Meiosis produces 4 unique haploid cells (for reproduction). Meiosis has crossing over and two divisions.', status: 'resolved', created_at: '2026-03-18T14:20:00Z' },
    ]};
    if (path === '/student/gamification') return this._gamification();
    if (path === '/student/study-plans') return { plans: [
      { id: 1, title: 'Biology Week Plan', plan_data: { topics: ['Cell Biology', 'Genetics', 'Ecology'] }, status: 'active', created_at: '2026-03-17' },
    ]};
    if (path === '/student/focus/stats') return this._focusStats();
    if (path === '/student/engagement/history') return this._engagementHistory();
    if (path === '/student/question-papers') return this._questionPapers();
    if (path === '/student/homework') return this._homework();
    if (path === '/student/report-card') return this._reportCard();
    if (path === '/student/notifications') return this._studentNotifications();
    if (path === '/student/attendance') return this._attendance();

    // Teacher
    if (path === '/teacher/dashboard') return this._teacherDashboard();
    if (path.startsWith('/teacher/content')) return { content: [
      { id: 1, title: 'Photosynthesis — Complete Guide', content_type: 'text', subject_id: 1, created_at: '2026-03-15' },
      { id: 2, title: 'Newton\'s Laws of Motion', content_type: 'text', subject_id: 2, created_at: '2026-03-14' },
      { id: 3, title: 'Linear Equations Practice', content_type: 'pdf', subject_id: 3, created_at: '2026-03-13' },
    ]};
    if (path.startsWith('/teacher/mcq/review')) return this._mcqReview();
    if (path.startsWith('/teacher/analytics')) return this._classAnalytics();
    if (path === '/teacher/doubts') return { doubts: [
      { id: 3, question: 'Can you explain the Krebs cycle in simpler terms?', student_id: 1, status: 'escalated', created_at: '2026-03-19' },
    ]};
    if (path === '/teacher/homework') return this._teacherHomework();
    if (path === '/teacher/notifications') return this._teacherNotifications();

    // Parent
    if (path === '/parent/dashboard') return this._parentDashboard();
    if (path.startsWith('/parent/child/') && path.includes('/sip')) return this._sipScores();
    if (path === '/parent/consent') return { consents: [
      { consent_type: 'engagement_tracking', granted: true, granted_at: '2026-01-15' },
      { consent_type: 'ai_interaction', granted: true, granted_at: '2026-01-15' },
      { consent_type: 'data_processing', granted: false },
    ]};
    if (path === '/parent/notifications') return { notifications: [
      { id: 1, title: 'Focus Alert', message: 'Arjun left SmartStudy during a study session (tab switch)', read: false, created_at: '2026-03-19T16:30:00Z' },
      { id: 2, title: 'Weekly Report', message: 'Arjun completed 85% of revision schedule this week. SIP improved by 4.2 points.', read: true, created_at: '2026-03-17T09:00:00Z' },
      { id: 3, title: 'Achievement Unlocked', message: 'Arjun earned "7-Day Streak" badge!', read: true, created_at: '2026-03-16T18:00:00Z' },
    ]};

    // Focus
    if (path.includes('/focus/child/') && path.includes('/audit')) return this._focusAudit();
    if (path.includes('/focus/child/') && path.includes('/settings')) return this._focusSettings();
    if (path.includes('/focus/school-report')) return this._schoolFocusReport();

    // Planner
    if (path === '/planner/categories') return this._plannerCategories();
    if (path.startsWith('/planner/entries/')) return this._plannerEntries();
    if (path.startsWith('/planner/insights/')) return this._plannerInsights();
    if (path === '/planner/my-schedule') return this._mySchedule();
    if (path.startsWith('/planner/completions/')) return { completions: [] };

    // Admin
    if (path === '/admin/dashboard') return this._adminDashboard();
    if (path.startsWith('/admin/students')) return this._adminStudents();
    if (path.startsWith('/admin/ai-usage')) return this._aiUsage();
    if (path === '/admin/system') return this._systemInfo();
    if (path.startsWith('/admin/topics')) return this._topics();
    if (path === '/admin/notifications') return this._adminNotifications();

    // Principal
    if (path === '/principal/overview') return this._principalOverview();
    if (path === '/principal/teacher-effectiveness') return this._teacherEffectiveness();
    if (path === '/principal/class-comparison') return this._classComparison();
    if (path === '/principal/monthly-summary') return this._monthlySummary();

    return {};
  }

  // Auth
  _login(body) {
    const role = body.username.includes('admin') ? 'admin' :
                 body.username.includes('principal') ? 'principal' :
                 body.username.includes('teacher') || body.username.includes('suresh') ? 'teacher' :
                 body.username.includes('parent') || body.username.includes('priya') ? 'parent' : 'student';
    currentUser = DEMO_USER[role];
    return { user: currentUser, token: 'demo-token' };
  }

  // Student
  _studentDashboard() {
    return {
      sip: [
        { subject_id: 1, subject_name: 'Biology', composite_sip: 72.5, trend: 'improving' },
        { subject_id: 2, subject_name: 'Physics', composite_sip: 58.3, trend: 'stable' },
        { subject_id: 3, subject_name: 'Mathematics', composite_sip: 81.2, trend: 'improving' },
      ],
      streak: { current_streak: 12, longest_streak: 18, total_points: 2450, level: 5 },
      upcomingRevisions: [
        { id: 1, topic_name: 'Cell Biology', subject_id: 1, scheduled_date: '2026-03-20', revision_number: 1, status: 'pending' },
        { id: 2, topic_name: 'Newton\'s 3rd Law', subject_id: 2, scheduled_date: '2026-03-20', revision_number: 3, status: 'pending' },
        { id: 3, topic_name: 'Quadratic Equations', subject_id: 3, scheduled_date: '2026-03-21', revision_number: 7, status: 'pending' },
      ],
      recentActivity: [
        { subject_id: 1, start_time: '2026-03-19T15:30:00Z', active_seconds: 2700, completed: true },
        { subject_id: 3, start_time: '2026-03-19T14:00:00Z', active_seconds: 3600, completed: true },
        { subject_id: 2, start_time: '2026-03-18T16:00:00Z', active_seconds: 1800, completed: false },
      ],
    };
  }

  _mcqPractice() {
    return { questions: [
      { id: 1, question_text: 'Which organelle is responsible for photosynthesis?', options: [{key:'A',text:'Mitochondria'},{key:'B',text:'Chloroplast'},{key:'C',text:'Ribosome'},{key:'D',text:'Golgi Body'}], difficulty: 'Medium', subject: 'Biology' },
      { id: 2, question_text: 'What is the powerhouse of the cell?', options: [{key:'A',text:'Nucleus'},{key:'B',text:'Chloroplast'},{key:'C',text:'Mitochondria'},{key:'D',text:'ER'}], difficulty: 'Easy', subject: 'Biology' },
      { id: 3, question_text: 'DNA replication occurs during which phase?', options: [{key:'A',text:'G1 phase'},{key:'B',text:'S Phase'},{key:'C',text:'G2 phase'},{key:'D',text:'M phase'}], difficulty: 'Medium', subject: 'Biology' },
      { id: 4, question_text: 'What is the SI unit of force?', options: [{key:'A',text:'Dyne'},{key:'B',text:'Newton'},{key:'C',text:'Joule'},{key:'D',text:'Watt'}], difficulty: 'Easy', subject: 'Physics' },
      { id: 5, question_text: 'Which law states F = ma?', options: [{key:'A',text:'First Law'},{key:'B',text:'Second Law'},{key:'C',text:'Third Law'},{key:'D',text:'Law of Gravitation'}], difficulty: 'Medium', subject: 'Physics' },
      { id: 6, question_text: 'What is the speed of light in vacuum?', options: [{key:'A',text:'3 × 10^8 m/s'},{key:'B',text:'3 × 10^7 m/s'},{key:'C',text:'3 × 10^9 m/s'},{key:'D',text:'3 × 10^6 m/s'}], difficulty: 'Easy', subject: 'Physics' },
      { id: 7, question_text: 'Solve: 2x + 5 = 13', options: [{key:'A',text:'x = 2'},{key:'B',text:'x = 3'},{key:'C',text:'x = 4'},{key:'D',text:'x = 5'}], difficulty: 'Easy', subject: 'Math' },
      { id: 8, question_text: 'What is the value of π (approximately)?', options: [{key:'A',text:'2.14'},{key:'B',text:'3.14'},{key:'C',text:'4.14'},{key:'D',text:'5.14'}], difficulty: 'Easy', subject: 'Math' },
      { id: 9, question_text: 'Find the area of a circle with radius 7 cm', options: [{key:'A',text:'154 cm²'},{key:'B',text:'144 cm²'},{key:'C',text:'164 cm²'},{key:'D',text:'174 cm²'}], difficulty: 'Medium', subject: 'Math' },
      { id: 10, question_text: 'What is the chemical formula for salt?', options: [{key:'A',text:'NaCl'},{key:'B',text:'NaOH'},{key:'C',text:'H2O'},{key:'D',text:'HCl'}], difficulty: 'Easy', subject: 'Chemistry' },
      { id: 11, question_text: 'Which element has atomic number 6?', options: [{key:'A',text:'Carbon'},{key:'B',text:'Oxygen'},{key:'C',text:'Nitrogen'},{key:'D',text:'Hydrogen'}], difficulty: 'Easy', subject: 'Chemistry' },
      { id: 12, question_text: 'What is the main theme of "The Odyssey"?', options: [{key:'A',text:'War and Glory'},{key:'B',text:'Journey Home'},{key:'C',text:'Love and Loss'},{key:'D',text:'Power and Control'}], difficulty: 'Medium', subject: 'English' },
    ]};
  }

  _mcqAnswer(body) {
    const correct = Math.random() > 0.3;
    return { correct, correctOption: 'B', explanation: 'The chloroplast is the organelle where photosynthesis takes place, converting light energy into chemical energy.', pointsAwarded: correct ? 10 : 0 };
  }

  _sipScores() {
    return { scores: [
      { subject_id: 1, subject_name: 'Biology', mcq_score: 75, engagement_score: 68, revision_score: 80, mock_score: 65, composite_sip: 72.5, trend: 'improving' },
      { subject_id: 2, subject_name: 'Physics', mcq_score: 55, engagement_score: 62, revision_score: 50, mock_score: 60, composite_sip: 58.3, trend: 'stable' },
      { subject_id: 3, subject_name: 'Mathematics', mcq_score: 85, engagement_score: 78, revision_score: 82, mock_score: 79, composite_sip: 81.2, trend: 'improving' },
    ]};
  }

  _revisions() {
    return { revisions: [
      { id: 1, topic_name: 'Cell Biology', subject_id: 1, scheduled_date: '2026-03-20', interval_day: 1, status: 'pending' },
      { id: 2, topic_name: 'Newton\'s 3rd Law', subject_id: 2, scheduled_date: '2026-03-20', interval_day: 3, status: 'pending' },
      { id: 3, topic_name: 'Quadratic Equations', subject_id: 3, scheduled_date: '2026-03-21', interval_day: 7, status: 'pending' },
      { id: 4, topic_name: 'Photosynthesis', subject_id: 1, scheduled_date: '2026-03-18', interval_day: 1, status: 'completed' },
    ]};
  }

  _gamification() {
    return {
      streak: { current_streak: 12, longest_streak: 18, total_points: 2450, level: 5 },
      badges: [
        { name: '7-Day Streak', icon: '🔥', earned_at: '2026-03-10' },
        { name: 'First MCQ Perfect', icon: '🏆', earned_at: '2026-03-05' },
        { name: 'Biology Master', icon: '🧬', earned_at: '2026-03-12' },
        { name: 'Quick Learner', icon: '⚡', earned_at: '2026-03-08' },
      ],
      leaderboard: [
        { rank: 1, name: 'Arjun K.', points: 2450 },
        { rank: 2, name: 'Riya S.', points: 2280 },
        { rank: 3, name: 'Karan M.', points: 2150 },
      ],
    };
  }

  _focusStats() {
    return {
      avgFocusScore: 82,
      totalViolationsWeek: 5,
      totalAwayWeek: 180,
      sessions: [
        { engagement_id: 1, total_violations: 1, total_away_seconds: 25, focus_score: 95, start_time: '2026-03-19T14:00:00Z', active_seconds: 1800 },
        { engagement_id: 2, total_violations: 3, total_away_seconds: 120, focus_score: 85, start_time: '2026-03-18T15:00:00Z', active_seconds: 2400 },
      ],
    };
  }

  _engagementHistory() {
    return {
      dailyStats: [
        { date: '2026-03-14', totalMinutes: 245, sessions: 4, devices: ['mobile', 'desktop'] },
        { date: '2026-03-15', totalMinutes: 310, sessions: 5, devices: ['desktop', 'tablet'] },
        { date: '2026-03-16', totalMinutes: 195, sessions: 3, devices: ['mobile'] },
        { date: '2026-03-17', totalMinutes: 280, sessions: 4, devices: ['desktop', 'mobile'] },
        { date: '2026-03-18', totalMinutes: 340, sessions: 6, devices: ['desktop', 'tablet', 'mobile'] },
        { date: '2026-03-19', totalMinutes: 265, sessions: 4, devices: ['desktop', 'mobile'] },
        { date: '2026-03-20', totalMinutes: 220, sessions: 3, devices: ['desktop'] },
      ],
      focusScore: 82,
      weeklyStats: { totalHours: 17.58, avgDailyMinutes: 265.4 },
      deviceBreakdown: [
        { device: 'Mobile', minutes: 650, sessions: 12 },
        { device: 'Tablet', minutes: 465, sessions: 8 },
        { device: 'Desktop', minutes: 740, sessions: 14 },
      ],
      subjectBreakdown: { Biology: 595, Physics: 500, Mathematics: 760 },
      sessions: [
        { id: 1, subject: 'Biology', date: '2026-03-20T08:00:00Z', duration: 75, active_seconds: 4500 },
        { id: 2, subject: 'Mathematics', date: '2026-03-20T10:00:00Z', duration: 90, active_seconds: 5400 },
        { id: 3, subject: 'Physics', date: '2026-03-19T15:00:00Z', duration: 70, active_seconds: 4200 },
        { id: 4, subject: 'Biology', date: '2026-03-19T10:00:00Z', duration: 105, active_seconds: 6300 },
      ],
    };
  }

  _questionPapers() {
    return [
        {
          id: 1,
          title: 'Biology Mid-Term',
          subject: 'Biology',
          totalQuestions: 20,
          totalMarks: 40,
          duration: 30,
          status: 'available',
          score: null,
          completedAt: null,
        },
        {
          id: 2,
          title: 'Physics Unit Test',
          subject: 'Physics',
          totalQuestions: 15,
          totalMarks: 30,
          duration: 20,
          status: 'completed',
          score: 24,
          completedAt: '2026-03-18T15:45:00Z',
        },
        {
          id: 3,
          title: 'Math Weekly Test',
          subject: 'Mathematics',
          totalQuestions: 10,
          totalMarks: 20,
          duration: 15,
          status: 'available',
          score: null,
          completedAt: null,
        },
        {
          id: 4,
          title: 'General Science Mock',
          subject: 'Science',
          totalQuestions: 25,
          totalMarks: 50,
          duration: 45,
          status: 'upcoming',
          score: null,
          completedAt: null,
        },
      ];
  }

  _homework() {
    return [
        {
          id: 1,
          title: 'Photosynthesis Essay',
          subject: 'Biology',
          assignedBy: 'Suresh Sharma',
          assignedDate: '2026-03-18',
          dueDate: '2026-03-21',
          status: 'pending',
          marks: null,
          totalMarks: 10,
          type: 'written',
        },
        {
          id: 2,
          title: 'Newton\'s Laws MCQ Set',
          subject: 'Physics',
          assignedBy: 'Suresh Sharma',
          assignedDate: '2026-03-19',
          dueDate: '2026-03-22',
          status: 'submitted',
          marks: null,
          totalMarks: 15,
          type: 'mcq',
        },
        {
          id: 3,
          title: 'Algebra Practice Problems',
          subject: 'Mathematics',
          assignedBy: 'Rajesh Kumar',
          assignedDate: '2026-03-17',
          dueDate: '2026-03-19',
          status: 'graded',
          marks: 18,
          totalMarks: 20,
          type: 'written',
        },
        {
          id: 4,
          title: 'Science Project - Energy Sources',
          subject: 'Chemistry',
          assignedBy: 'Priya Singh',
          assignedDate: '2026-03-10',
          dueDate: '2026-03-17',
          status: 'overdue',
          marks: null,
          totalMarks: 25,
          type: 'project',
        },
        {
          id: 5,
          title: 'English Literature Analysis',
          subject: 'English',
          assignedBy: 'Meera Nair',
          assignedDate: '2026-03-16',
          dueDate: '2026-03-23',
          status: 'submitted',
          marks: null,
          totalMarks: 20,
          type: 'written',
        },
        {
          id: 6,
          title: 'Biology Cell Structure Diagram',
          subject: 'Biology',
          assignedBy: 'Suresh Sharma',
          assignedDate: '2026-03-15',
          dueDate: '2026-03-20',
          status: 'graded',
          marks: 8,
          totalMarks: 10,
          type: 'project',
        },
        {
          id: 7,
          title: 'Chemistry Balancing Equations',
          subject: 'Chemistry',
          assignedBy: 'Priya Singh',
          assignedDate: '2026-03-19',
          dueDate: '2026-03-24',
          status: 'pending',
          marks: null,
          totalMarks: 15,
          type: 'mcq',
        },
        {
          id: 8,
          title: 'Physics Wave Properties Assignment',
          subject: 'Physics',
          assignedBy: 'Suresh Sharma',
          assignedDate: '2026-03-14',
          dueDate: '2026-03-18',
          status: 'overdue',
          marks: null,
          totalMarks: 12,
          type: 'written',
        },
      ];
  }

  _reportCard() {
    return {
      term: 'Mid-Term 2025-26',
      student: {
        id: 1,
        name: 'Arjun Kumar',
        class: '10-A',
        rollNumber: '15',
      },
      subjects: [
        { name: 'Biology', marks: 78, totalMarks: 100, grade: 'A', remark: 'Excellent understanding of concepts. Very attentive in class.' },
        { name: 'Physics', marks: 72, totalMarks: 100, grade: 'A', remark: 'Good grasp of numerical problems. Needs more practice with derivations.' },
        { name: 'Mathematics', marks: 85, totalMarks: 100, grade: 'A+', remark: 'Outstanding performance. Sharp analytical skills demonstrated.' },
        { name: 'Chemistry', marks: 75, totalMarks: 100, grade: 'A', remark: 'Good conceptual clarity. Practice organic chemistry more.' },
        { name: 'English', marks: 82, totalMarks: 100, grade: 'A', remark: 'Excellent writing skills and articulation. Keep it up!' },
      ],
      overallPercentage: 78.4,
      rank: 8,
      attendance: 94,
      principalRemark: 'Outstanding all-round development. Keep maintaining this standard of excellence.',
      classTeacherRemark: 'Arjun is a dedicated student with consistent performance. Shows good leadership qualities.',
      generatedDate: '2026-03-15',
    };
  }

  _studentNotifications() {
    return [
        { id: 1, type: 'homework_due', title: 'Homework Due Tomorrow', message: 'Newton\'s Laws MCQ Set is due tomorrow', time: '2026-03-20T10:30:00Z', read: false },
        { id: 2, type: 'test_reminder', title: 'Upcoming Test', message: 'Biology Mid-Term test on 2026-03-22. Start revision now!', time: '2026-03-20T09:00:00Z', read: false },
        { id: 3, type: 'achievement', title: 'Achievement Unlocked', message: 'You earned "Perfect Score" badge!', time: '2026-03-19T16:45:00Z', read: true },
        { id: 4, type: 'revision_reminder', title: 'Revision Time', message: 'Cell Biology revision is scheduled for today', time: '2026-03-20T08:00:00Z', read: false },
        { id: 5, type: 'report_card', title: 'Report Card Available', message: 'Your mid-term report card is now available', time: '2026-03-15T14:00:00Z', read: true },
      ];
  }

  _attendance() {
    return {
      monthlyAttendance: {
        month: 'March 2026',
        present: 18,
        absent: 1,
        late: 2,
        totalDays: 21,
      },
      last30Days: [
        { date: '2026-03-01', status: 'present' },
        { date: '2026-03-02', status: 'present' },
        { date: '2026-03-03', status: 'late' },
        { date: '2026-03-04', status: 'present' },
        { date: '2026-03-05', status: 'present' },
        { date: '2026-03-06', status: 'present' },
        { date: '2026-03-07', status: 'absent' },
        { date: '2026-03-08', status: 'present' },
        { date: '2026-03-09', status: 'present' },
        { date: '2026-03-10', status: 'present' },
        { date: '2026-03-11', status: 'present' },
        { date: '2026-03-12', status: 'present' },
        { date: '2026-03-13', status: 'late' },
        { date: '2026-03-14', status: 'present' },
        { date: '2026-03-15', status: 'present' },
        { date: '2026-03-16', status: 'present' },
        { date: '2026-03-17', status: 'present' },
        { date: '2026-03-18', status: 'present' },
        { date: '2026-03-19', status: 'present' },
        { date: '2026-03-20', status: 'present' },
      ],
      attendancePercentage: 90.5,
    };
  }

  // Teacher
  _teacherDashboard() {
    return {
      pendingMcqReviews: 8,
      totalContent: 24,
      classStats: { avg_sip: 65.4, total_students: 45, active_today: 32 },
      unresolvedDoubts: 2,
      classPerformance: [
        { subject_id: 1, student_count: 42, avg_sip: 68.4 },
        { subject_id: 2, student_count: 40, avg_sip: 58.2 },
        { subject_id: 3, student_count: 44, avg_sip: 72.1 },
      ],
    };
  }

  _mcqReview() {
    return { questions: [
      { id: 10, question_text: 'What is the chemical formula for water?', options: [{key:'A',text:'H2O'},{key:'B',text:'CO2'},{key:'C',text:'NaCl'},{key:'D',text:'O2'}], correct_option: 'A', source: 'ai', ai_model: 'gpt-4o-mini', review_status: 'pending', topic_name: 'Chemistry Basics' },
      { id: 11, question_text: 'Which planet is known as the Red Planet?', options: [{key:'A',text:'Venus'},{key:'B',text:'Mars'},{key:'C',text:'Jupiter'},{key:'D',text:'Saturn'}], correct_option: 'B', source: 'ai', ai_model: 'gpt-4o-mini', review_status: 'pending', topic_name: 'Solar System' },
    ]};
  }

  _classAnalytics() {
    return {
      sipDistribution: { excellent: 8, good: 15, average: 14, needs_improvement: 8 },
      topPerformers: [
        { student_id: 1, name: 'Arjun Kumar', avg_sip: 72.5 },
        { student_id: 5, name: 'Riya Sharma', avg_sip: 78.2 },
      ],
      weakTopics: [
        { topic_name: 'Electromagnetic Induction', avg_score: 38.5, attempts: 42 },
        { topic_name: 'Organic Chemistry', avg_score: 42.1, attempts: 38 },
      ],
      engagement: { avg_daily_minutes: 45, active_ratio: 0.71 },
    };
  }

  _teacherHomework() {
    return {
      assignments: [
        {
          id: 1,
          title: 'Photosynthesis Essay',
          subject: 'Biology',
          assignedDate: '2026-03-18',
          dueDate: '2026-03-21',
          totalAssigned: 45,
          submitted: 32,
          pending: 13,
          graded: 28,
        },
        {
          id: 2,
          title: 'Newton\'s Laws MCQ Set',
          subject: 'Physics',
          assignedDate: '2026-03-19',
          dueDate: '2026-03-22',
          totalAssigned: 45,
          submitted: 18,
          pending: 27,
          graded: 0,
        },
        {
          id: 3,
          title: 'Algebra Practice Problems',
          subject: 'Mathematics',
          assignedDate: '2026-03-17',
          dueDate: '2026-03-19',
          totalAssigned: 45,
          submitted: 43,
          pending: 2,
          graded: 42,
        },
      ],
    };
  }

  _teacherNotifications() {
    return {
      notifications: [
        { id: 1, type: 'new_submission', title: 'New Homework Submission', message: 'Riya Sharma submitted "Photosynthesis Essay"', created_at: '2026-03-20T11:30:00Z', read: false },
        { id: 2, type: 'mcq_review', title: 'MCQ Review Pending', message: '3 AI-generated MCQs are waiting for your review', created_at: '2026-03-20T09:15:00Z', read: false },
        { id: 3, type: 'doubt_escalated', title: 'Doubt Escalated', message: 'Karan M. escalated a doubt about Krebs cycle', created_at: '2026-03-19T16:00:00Z', read: true },
        { id: 4, type: 'new_submission', title: 'New Homework Submission', message: 'Arjun Kumar submitted "Biology Cell Structure Diagram"', created_at: '2026-03-19T14:45:00Z', read: true },
      ],
    };
  }

  // Parent
  _parentDashboard() {
    return {
      children: [{
        student: { id: 1, first_name: 'Arjun', last_name: 'Kumar' },
        sip: [
          { subject_id: 1, composite_sip: 72.5, trend: 'improving' },
          { subject_id: 2, composite_sip: 58.3, trend: 'stable' },
          { subject_id: 3, composite_sip: 81.2, trend: 'improving' },
        ],
        streak: { current_streak: 12, total_points: 2450, level: 5 },
        recentRevisions: [
          { topic_name: 'Photosynthesis', scheduled_date: '2026-03-18', status: 'completed' },
          { topic_name: 'Cell Biology', scheduled_date: '2026-03-20', status: 'pending' },
        ],
        homeworkSummary: {
          assigned: 8,
          pending: 3,
          overdue: 1,
          completed: 4,
        },
        todayStudyMinutes: 185,
        weeklyStudyHours: 17.5,
        reportCardAvailable: true,
        attendanceSummary: {
          present: 18,
          absent: 1,
          attendancePercentage: 90.5,
        },
      }],
    };
  }

  _focusAudit() {
    return {
      studentId: 1, period: '7 days',
      summary: { total_sessions: 14, avg_focus_score: 82.5, total_violations: 8, total_away_seconds: 340, max_single_away: 65, good_sessions: 11, poor_sessions: 1 },
      sessions: [
        { engagement_id: 1, total_violations: 0, total_away_seconds: 0, longest_away: 0, focus_score: 100, start_time: '2026-03-19T14:00:00Z', end_time: '2026-03-19T14:45:00Z', active_seconds: 2700, subject_id: 1, completed: true },
        { engagement_id: 2, total_violations: 2, total_away_seconds: 45, longest_away: 30, focus_score: 90, start_time: '2026-03-19T10:00:00Z', end_time: '2026-03-19T10:30:00Z', active_seconds: 1800, subject_id: 3, completed: true },
        { engagement_id: 3, total_violations: 3, total_away_seconds: 120, longest_away: 65, focus_score: 85, start_time: '2026-03-18T15:00:00Z', end_time: '2026-03-18T16:00:00Z', active_seconds: 3600, subject_id: 2, completed: true },
        { engagement_id: 4, total_violations: 1, total_away_seconds: 20, longest_away: 20, focus_score: 95, start_time: '2026-03-17T14:30:00Z', end_time: '2026-03-17T15:15:00Z', active_seconds: 2700, subject_id: 1, completed: true },
        { engagement_id: 5, total_violations: 0, total_away_seconds: 0, longest_away: 0, focus_score: 100, start_time: '2026-03-16T16:00:00Z', end_time: '2026-03-16T16:40:00Z', active_seconds: 2400, subject_id: 3, completed: true },
      ],
      violations: [
        { id: 1, violation_type: 'tab_switch', left_at: '2026-03-19T10:12:00Z', returned_at: '2026-03-19T10:12:25Z', away_seconds: 25, parent_notified: true },
        { id: 2, violation_type: 'window_blur', left_at: '2026-03-19T10:20:00Z', returned_at: '2026-03-19T10:20:20Z', away_seconds: 20, parent_notified: false },
        { id: 3, violation_type: 'tab_switch', left_at: '2026-03-18T15:15:00Z', returned_at: '2026-03-18T15:16:05Z', away_seconds: 65, parent_notified: true },
        { id: 4, violation_type: 'tab_switch', left_at: '2026-03-18T15:30:00Z', returned_at: '2026-03-18T15:30:30Z', away_seconds: 30, parent_notified: true },
        { id: 5, violation_type: 'window_blur', left_at: '2026-03-18T15:45:00Z', returned_at: '2026-03-18T15:45:25Z', away_seconds: 25, parent_notified: false },
      ],
    };
  }

  _focusSettings() {
    return {
      settings: { focus_mode_enabled: true, notify_on_violation: true, notify_threshold: 1, max_away_seconds: 30, block_mode: 'soft' },
    };
  }

  _schoolFocusReport() {
    return {
      overview: { students_tracked: 120, avg_focus_score: 78.5, total_violations: 156, poor_focus_sessions: 12 },
      dailyTrend: [
        { date: '2026-03-14', violations: 28, students: 15 },
        { date: '2026-03-15', violations: 22, students: 12 },
        { date: '2026-03-16', violations: 18, students: 10 },
        { date: '2026-03-17', violations: 30, students: 18 },
        { date: '2026-03-18', violations: 25, students: 14 },
        { date: '2026-03-19', violations: 20, students: 11 },
        { date: '2026-03-20', violations: 13, students: 8 },
      ],
    };
  }

  // Planner
  _plannerCategories() {
    return { categories: [
      { id: 1, name: 'Study', icon: '📚', color: '#4F46E5', sort_order: 1 },
      { id: 2, name: 'Homework', icon: '📝', color: '#7C3AED', sort_order: 2 },
      { id: 3, name: 'Revision', icon: '🔄', color: '#6366F1', sort_order: 3 },
      { id: 4, name: 'MCQ Practice', icon: '✅', color: '#8B5CF6', sort_order: 4 },
      { id: 5, name: 'Tuition', icon: '👨‍🏫', color: '#A78BFA', sort_order: 5 },
      { id: 6, name: 'Sports', icon: '⚽', color: '#10B981', sort_order: 6 },
      { id: 7, name: 'Outdoor Play', icon: '🏃', color: '#34D399', sort_order: 7 },
      { id: 8, name: 'Music', icon: '🎵', color: '#F59E0B', sort_order: 8 },
      { id: 9, name: 'Art & Craft', icon: '🎨', color: '#F97316', sort_order: 9 },
      { id: 10, name: 'Reading', icon: '📖', color: '#3B82F6', sort_order: 10 },
      { id: 11, name: 'Screen Time', icon: '📱', color: '#EF4444', sort_order: 11 },
      { id: 12, name: 'Meal', icon: '🍽️', color: '#84CC16', sort_order: 12 },
      { id: 13, name: 'Breakfast', icon: '🥣', color: '#A3E635', sort_order: 13 },
      { id: 14, name: 'Lunch', icon: '🍱', color: '#65A30D', sort_order: 14 },
      { id: 15, name: 'Dinner', icon: '🍛', color: '#4D7C0F', sort_order: 15 },
      { id: 16, name: 'Sleep', icon: '😴', color: '#6B7280', sort_order: 17 },
      { id: 17, name: 'Bath / Hygiene', icon: '🚿', color: '#06B6D4', sort_order: 19 },
      { id: 18, name: 'Family Time', icon: '�‍👩‍👧‍👦', color: '#EC4899', sort_order: 20 },
      { id: 19, name: 'Free Time', icon: '🎮', color: '#F472B6', sort_order: 22 },
    ]};
  }

  _plannerEntries() {
    return { entries: [
      // Monday
      { id: 1, day_of_week: 1, start_time: '06:30:00', end_time: '07:00:00', title: 'Wake up & Bath', category_name: 'Bath / Hygiene', category_icon: '🚿', category_color: '#06B6D4' },
      { id: 2, day_of_week: 1, start_time: '07:00:00', end_time: '07:30:00', title: null, category_name: 'Breakfast', category_icon: '🥣', category_color: '#A3E635' },
      { id: 3, day_of_week: 1, start_time: '08:00:00', end_time: '10:00:00', title: 'Math + Science', category_name: 'Study', category_icon: '📚', category_color: '#4F46E5' },
      { id: 4, day_of_week: 1, start_time: '10:00:00', end_time: '10:30:00', title: null, category_name: 'Outdoor Play', category_icon: '🏃', category_color: '#34D399' },
      { id: 5, day_of_week: 1, start_time: '10:30:00', end_time: '11:30:00', title: 'Biology revision', category_name: 'Revision', category_icon: '🔄', category_color: '#6366F1' },
      { id: 6, day_of_week: 1, start_time: '12:00:00', end_time: '12:30:00', title: null, category_name: 'Lunch', category_icon: '🍱', category_color: '#65A30D' },
      { id: 7, day_of_week: 1, start_time: '14:00:00', end_time: '15:00:00', title: null, category_name: 'Homework', category_icon: '📝', category_color: '#7C3AED' },
      { id: 8, day_of_week: 1, start_time: '16:00:00', end_time: '17:00:00', title: 'Cricket', category_name: 'Sports', category_icon: '⚽', category_color: '#10B981' },
      { id: 9, day_of_week: 1, start_time: '17:30:00', end_time: '18:30:00', title: null, category_name: 'Tuition', category_icon: '👨‍🏫', category_color: '#A78BFA' },
      { id: 10, day_of_week: 1, start_time: '19:00:00', end_time: '19:30:00', title: null, category_name: 'Dinner', category_icon: '🍛', category_color: '#4D7C0F' },
      { id: 11, day_of_week: 1, start_time: '19:30:00', end_time: '20:00:00', title: null, category_name: 'Screen Time', category_icon: '📱', category_color: '#EF4444' },
      { id: 12, day_of_week: 1, start_time: '21:00:00', end_time: '06:30:00', title: null, category_name: 'Sleep', category_icon: '😴', category_color: '#6B7280' },
      // Tuesday
      { id: 13, day_of_week: 2, start_time: '06:30:00', end_time: '07:00:00', title: 'Wake up', category_name: 'Bath / Hygiene', category_icon: '🚿', category_color: '#06B6D4' },
      { id: 14, day_of_week: 2, start_time: '07:00:00', end_time: '07:30:00', title: null, category_name: 'Breakfast', category_icon: '🥣', category_color: '#A3E635' },
      { id: 15, day_of_week: 2, start_time: '08:00:00', end_time: '10:00:00', title: 'English + Hindi', category_name: 'Study', category_icon: '📚', category_color: '#4F46E5' },
      { id: 16, day_of_week: 2, start_time: '10:30:00', end_time: '11:00:00', title: null, category_name: 'MCQ Practice', category_icon: '✅', category_color: '#8B5CF6' },
      { id: 17, day_of_week: 2, start_time: '15:00:00', end_time: '16:00:00', title: 'Piano class', category_name: 'Music', category_icon: '🎵', category_color: '#F59E0B' },
      { id: 18, day_of_week: 2, start_time: '17:00:00', end_time: '18:00:00', title: null, category_name: 'Sports', category_icon: '⚽', category_color: '#10B981' },
      // Wed-Sun have some entries too
      { id: 19, day_of_week: 3, start_time: '08:00:00', end_time: '10:00:00', title: 'Physics + Chemistry', category_name: 'Study', category_icon: '📚', category_color: '#4F46E5' },
      { id: 20, day_of_week: 3, start_time: '16:00:00', end_time: '17:00:00', title: null, category_name: 'Art & Craft', category_icon: '🎨', category_color: '#F97316' },
      { id: 21, day_of_week: 4, start_time: '08:00:00', end_time: '10:00:00', title: 'Math + Biology', category_name: 'Study', category_icon: '📚', category_color: '#4F46E5' },
      { id: 22, day_of_week: 4, start_time: '15:00:00', end_time: '16:00:00', title: null, category_name: 'Tuition', category_icon: '👨‍🏫', category_color: '#A78BFA' },
      { id: 23, day_of_week: 5, start_time: '08:00:00', end_time: '09:30:00', title: 'Weekly test prep', category_name: 'Revision', category_icon: '🔄', category_color: '#6366F1' },
      { id: 24, day_of_week: 5, start_time: '16:00:00', end_time: '17:30:00', title: 'Football', category_name: 'Sports', category_icon: '⚽	��]Y�ܞW���܎�	��L�NI�K��Y��K^W�ٗ��YZΈ
��\��[YN�	�N��	�[��[YN�	�L��	�]N��[�]Y�ܞWۘ[YN�	ԙXY[����]Y�ܞW�X�ێ�	�'����]Y�ܞW���܎�	��Ў����K��Y���^W�ٗ��YZΈ
��\��[YN�	�M���	�[��[YN�	�N��	�]N��[�]Y�ܞWۘ[YN�	ј[Z[H[YI��]Y�ܞW�X�ێ�	�'�j8�#|'�jx�#|'�i��#|'�i���]Y�ܞW���܎�	��P�NI�K��Y���^W�ٗ��YZΈ�\��[YN�	�L��	�[��[YN�	�LN��	�]N�	�Y��]�\�[ۉ��]Y�ܞWۘ[YN�	ԙ]�\�[ۉ��]Y�ܞW�X�ێ�	�'�!	��]Y�ܞW���܎�	�͍͌��I�K��Y��^W�ٗ��YZΈ�\��[YN�	�MN��	�[��[YN�	�MΌ�	�]N��[�]Y�ܞWۘ[YN�	ќ�YH[YI��]Y�ܞW�X�ێ�	�'㫉��]Y�ܞW���܎�	�э
̐���K�_NB���[��\�[��Y��
H�]\��]N�	̌��L�L�	�^Sٕ�YZΈ
�[��Y\Έ�K��[[X\�N���[[��YZ[��
M�YSZ[��NX�]�]SZ[��L��ܙY[�[YSZ[����Y\Z[��
M��\]Y��[��
��[��[��LK��\��[��Έ���ۜ�Y\�Y[���]�܈X�]�]H�^I�K�NB���^T��Y[J
H�]\����^N��Y���\��[YN�	���	�[��[YN�	�L��	�]N�	�X]
���Y[��I��]Y�ܞWۘ[YN�	��YI�X�ێ�	�'�����܎�	���
�MI�K��Y�
��\��[YN�	�M��	�[��[YN�	�MN��	�]N��[�]Y�ܞWۘ[YN�	��Y]�ܚ��X�ێ�	�'��I���܎�	�����QQ	�K��Y��\��[YN�	�M���	�[��[YN�	�MΌ�	�]N�	�ܚX��]	��]Y�ܞWۘ[YN�	��ܝ��X�ێ�	���I���܎�	��L�NI�K�_NB����YZ[���YZ[�\���\�

H�]\��ݙ\��Y]Έ��[�Y[�Έ

L�[XX�\�Έ�[�Yܘ][ۓ[�N�	��[�[ۙI�K��۝[����[���K�X�N��\�ݙY�L�[�[�ԙ]�Y]Έ
K��\�������]����\�
���]ܚ\�����[���K�[��Y�[Y[���X�]�W��Y[�Έ�L�K��Y]�ܚΈ��[\��YۙY��
��\][۔�]N�
��Kݙ\�YP��[��N]���X�Z\��[ە[YN�͈K���Y�X�][ۜΈ��[��[��L�[��XY�M
HK�[��Y�[Y[�Y]�X�Έ�]��Z[T�YSZ[����K�[�\��[ۜ��YZΈ̍K�ZN���[ܙ\]Y\�Έ
M�[�����	����	�]���][��W�\ΈL��Z[\�\ΈL�K�Z[PX�]�T�Y[�Έ�]N�	̌��L�LM	�X�]�W��Y[�Έ�
HK��]N�	̌��L�LMI�X�]�W��Y[�ΈM�K��]N�	̌��L�LM��X�]�W��Y[�ΈNK��]N�	̌��L�LM��X�]�W��Y[�Έ�LK��]N�	̌��L�LN	�X�]�W��Y[�Έ�NK��]N�	̌��L�LNI�X�]�W��Y[�Έ�
HK��]N�	̌��L�L�	�X�]�W��Y[�Έ�L�K�K�NB���YZ[��Y[��
H�]\����Y[�Έ�Y�K�\��ۘ[YN�	�\��[��\�ۘ[YN�	��[X\��]����\�
̋�K��XZΈL��[�Έ�
LK��Y���\��ۘ[YN�	Ԛ^XI�\�ۘ[YN�	��\�XI�]����\�
�����XZΈ�[�Έ��K��Y���\��ۘ[YN�	��\�[��\�ۘ[YN�	�YZI�]����\�
�K�K��XZΈ
K�[�Έ�MLK��Y�
�\��ۘ[YN�	�[�[�XI�\�ۘ[YN�	�][	�]����\�����XZΈMK�[�Έ�LK��Y�
K�\��ۘ[YN�	՚Zܘ[I�\�ۘ[YN�	��[��	�]����\�

K����XZΈ��[�ΈLK��Y�
��\��ۘ[YN�	��]I�\�ۘ[YN�	��\I�]����\�
�K���XZΈK�[�ΈNMLK�_NB���ZU\�Y�J
H�]\���U\N���\]Y\��\N�	�X�W��[�\�][ۉ���[��̌����	�N�L	�]���][��N�MK���\]Y\��\N�	��X�����[�����[�������	�MK��	�]���][��N�LLK���\]Y\��\N�	��YW�[����[��MM����	�K�	�]���][��N�LK���\]Y\��\N�	��۝[���[[X\�I���[��L����	̋�	�]���][��N�K�K��S[�[��[�[�\�Y�	��M�[Z[�I���[��
������	��K�	�K��[�[�\�Y�	��[Z[�KL��Y�\�	���[��������	�ˌ�	�K�K�NB����\�[R[���
H�]\���\��[ێ�	�K��	�[�Yܘ][ۓ[�N�	��[�[ۙI���U�\��[ێ�	݌���L��	�\[YN�
��]X�\�N���[�ۛ�X�[ۜΈX^�ۛ�X�[ۜΈ�][^�][۔��
K�ZN���[�ZP�ۙ�Y�\�Y��YK�[Z[�P�ۙ�Y�\�Y��YK�Y[�Z[S[Z]�
LK�NB����X��
H�]\����X�Έ�Y�K�[YN�	����[�\�\���\\�۝[X�\��K��\��	�Д�I�Y��X�[W�]�[�	�YY][I�K��Y���[YN�	��[�[���I��\\�۝[X�\�����\��	�Д�I�Y��X�[W�]�[�	�X\�I�K��Y���[YN�	��[�]X��	�\�Y]I��\\�۝[X�\�����\��	�Д�I�Y��X�[W�]�[�	�\�	�K��Y�
�[YN�	ә]�ۗ	��]����\\�۝[X�\��K��\��	�Д�I�Y��X�[W�]�[�	�YY][I�K��Y�
K�[YN�	�[X���XYۙ]X�[�X�[ۉ��\\�۝[X�\��
K��\��	�Д�I�Y��X�[W�]�[�	�\�	�K�_NB���YZ[���Y�X�][ۜ�
H�]\����Y�X�][ۜΈ�Y�K\N�	��\�[W�[\�	�]N�	��\�[H\��ܛX[��I�Y\��Y�N�	��\��\��H\�Y�H\�
̉K�[ۚ]܈���[K��[Y\�[\�	̌��L�L�L�
N����XY��[�HK��Y��\N�	ۙ]�ܙY�\��][ۉ�]N�	ә]��Y�\��][ۜ��Y\��Y�N�	�L��]��Y[���Y�\�\�Y[�H\���\���[Y\�[\�	̌��L�L������XY��[�HK��Y��\N�	��\�[W�[\�	�]N�	�]X�\�H�X��\	�Y\��Y�N�	���Y[Y�X��\��\]Y�X��\�ٝ[I�[Y\�[\�	̌��L�LNU�������XY��YHK��Y�
\N�	ۙ]�ܙY�\��][ۉ�]N�	ә]�XX�\��Y�\��][ۉ�Y\��Y�N�	ә]�XX�\��Y�\�\�Y�YY\�H�Z\��[Y\�[\�	̌��L�LNMN������XY��YHK�K�NB�����[��\[���[��\[ݙ\��Y]�
H�]\���������[�Y[�Έ

L�[XX�\�Έ�[�Yܘ][ۓ[�N�	��[�[ۙI�K��\��]����\�
���YYX[���\�
����^�[[��
L�����M
K]�\�Y�N�M��YY��[�
HK��X��X���XZ��ێ���X��X��Y�K]����\�
���Y[����[��
�[\�ݚ[�ΈNX�[�[�Έ

HK���X��X��Y��]����\�
N���Y[����[��
L[\�ݚ[�ΈL�X�[�[�Έ
HK���X��X��Y��]����\�
̋�K�Y[����[��

[\�ݚ[�Έ�LX�[�[�Έ�HK�K�[��Y�[Y[��[����YZΈ	̌��L�L�	�X�]�W��Y[�Έ��[��\�ΈM�]����\��[ۗ�Z[���K���YZΈ	̌��L�L��X�]�W��Y[�Έ�L�[��\�ΈMN]����\��[ۗ�Z[��
�K���YZΈ	̌��L�LL	�X�]�W��Y[�Έ̍K�[��\�ΈM�L]����\��[ۗ�Z[��
K���YZΈ	̌��L�LM��X�]�W��Y[�Έ��[��\�ΈM̌]����\��[ۗ�Z[��

K�K��]�\�[ې��\X[��N����\X[��T�]N�
̋��\]Y��
ݙ\�YN�
N��\Y�
L�K�ZN���[ܙ\]Y\�Έ
M�[�����	����	��Z[\�\ΈL�K�]�\���Y[�Έ��Y[��Y�
K�X��X��Y����\��]W��\�̋��[��	�X�[�[���K���Y[��Y�L��X��X��Y�K��\��]W��\����[��	�X�[�[���K���Y[��Y�N�X��X��Y����\��]W��\��K�K�[��	��X�I�K�K��\��ܛY\�Έ��Y[��Y�
�X��X��Y����\��]W��\�L��K�[��	�[\�ݚ[���K���Y[��Y���X��X��Y�K��\��]W��\����[��	�[\�ݚ[���K���Y[��Y�K�X��X��Y����\��]W��\�K���[��	�[\�ݚ[���K�K��Y]�ܚΈ���\][۔�]N�
��HK�[��Y�[Y[�Y]�X�Έ�]��Z[T�YSZ[����K�[�\��[ۜ��YZΈ̍]�ћ��\���ܙN��K�NB���XX�\�Y��X�]�[�\��
H�]\���XX�\�Έ�XX�\��Y�K�۝[��YX�\Έ

KX�\��ܙX]Y��K��XX�\��Y���۝[��YX�\Έ�X�\��ܙX]Y�NMHK��XX�\��Y���۝[��YX�\Έ̋X�\��ܙX]Y��LK��XX�\��Y�
�۝[��YX�\Έ�X�\��ܙX]Y�M�HK��XX�\��Y�
K�۝[��YX�\Έ��X�\��ܙX]Y�L�K�_NB����\����\\�\�ۊ
H�]\����\��\Έ��\���Y��X�[ۗ�Y�	�I�]����\�
�K���Y[����[��

HK���\���Y��X�[ۗ�Y�	Љ�]����\�
���Y[����[��
�K���\���Y�K�X�[ۗ�Y�	�I�]����\�
��K�Y[����[��
K���\���Y�K�X�[ۗ�Y�	Љ�]����\�
���K�Y[����[��

K���\���Y�L�X�[ۗ�Y�	�I�]����\�
�����Y[����[��
K���\���Y�L�X�[ۗ�Y�	Љ�]����\�
NK��Y[����[���K�_NB���[۝T�[[X\�J
H�]\��[۝Q[��Y�[Y[���[۝�	̌�KLLLI�X�]�W��Y[�Έ��[��\�Έ
L�K��[۝�	̌�KLLKLI�X�]�W��Y[�Έ�L�[��\�Έ
NK��[۝�	̌�KLL�LI�X�]�W��Y[�Έ�L�[��\�Έ

LK��[۝�	̌��LKLI�X�]�W��Y[�Έ̌�[��\�Έ
�LK��[۝�	̌��L�LI�X�]�W��Y[�Έ��[��\�Έ
�K��[۝�	̌��L�LI�X�]�W��Y[�Έ�L�[��\�Έ
�K�K�[۝SX�N��[۝�	̌�KLLLI��[�[���\�ΈL��ܜ�X��[���\�Έ
�K��[۝�	̌�KLLKLI��[�[���\�ΈM
L�ܜ�X��[���\�ΈMLK��[۝�	̌�KLL�LI��[�[���\�ΈL��ܜ�X��[���\�Έ
�K��[۝�	̌��LKLI��[�[���\�ΈMN�ܜ�X��[���\�ΈLLK��[۝�	̌��L�LI��[�[���\�ΈM�L�ܜ�X��[���\�ΈLM�K��[۝�	̌��L�LI��[�[���\�ΈM̌�ܜ�X��[���\�ΈL�K�K�[۝Q�X�Έ�[۝�	̌�KLLLI��[��X�Έ

L�\���Y��X�Έ�K��[۝�	̌�KLLKLI��[��X�Έ
L��\���Y��X�Έ

�K��[۝�	̌�KLL�LI��[��X�Έ��\���Y��X�Έ�K��[۝�	̌��LKLI��[��X�Έ
N�\���Y��X�Έ
L�K��[۝�	̌��L�LI��[��X�Έ
�L�\���Y��X�Έ
M�HK��[۝�	̌��L�LI��[��X�Έ
��\���Y��X�Έ
�K�K�NB�����۝�[�Y[��Hܘ\\��X]�[��\K���[�\��X�B�\�[����[�K
H��]\��\˜�\]Y\�
	���	�	��]]���[���\�\��[YN�K\���ܙ�JN�B�\�[�����]

H��]\��\˜�\]Y\�
	���	�	��]]����]	�N�B�\�[��YJ
H��]\��\˜�\]Y\�
	��U	�	��]]�YI�N�B�\�[���Y[�\���\�

H��]\��\˜�\]Y\�
	��U	�	���Y[��\���\�	�N�B�\�[���\�[��Y�[Y[�

H��]\����\��[ےY�K�\�[YN��]�]J
K��T����[��
HN�B�\�[��X\��X]

H��]\����]\Έ	����N�B�\�[��[�[��Y�[Y[�

H��]\����]\Έ	���\]Y	�N�B�\�[���]X�T�X�X�J�H��]\��\˜�\]Y\�
	��U	���Y[��X�K��X�X�O��X�YI�I���[�I��X
N�B�\�[���X�Z]X�P[���\�
H��]\��\˜�\]Y\�
	���	�	���Y[��X�K�[���\��
N�B�\�[���]�\��ܙ\�
H��]\��\˜�\]Y\�
	��U	�	���Y[���\	�N�B�\�[���]�]�\�[ۜ�
H��]\��\˜�\]Y\�
	��U	�	���Y[�ܙ]�\�[ۜ��N�B�\�[����\]T�]�\�[ۊY
H��]\����]\Έ	���\]Y	�N�B�\�[��\���X�

H��]\���Y�NKZWܙ\�ۜ�N�	�ܙX]]Y\�[ۈH]YH^Z[�����N�B�\�[���]�X��
H��]\��\˜�\]Y\�
	��U	�	���Y[���X���N�B�\�[���]�[ZY�X�][ۊ
H��]\��\˜�\]Y\�
	��U	�	���Y[���[ZY�X�][ۉ�N�B�\�[���]�YT[��
H��]\��\˜�\]Y\�
	��U	�	���Y[���YK\[���N�B�\�[���][��Y�[Y[�\�ܞJ
H��]\��\˜�\]Y\�
	��U	�	���Y[��[��Y�[Y[��\�ܞI�N�B�\�[���]]Y\�[۔\\��
H��]\��\˜�\]Y\�
	��U	�	���Y[��]Y\�[ۋ\\\���N�B�\�[���]�Y]�ܚ�
H��]\��\˜�\]Y\�
	��U	�	���Y[���Y]�ܚ��N�B�\�[���]�\ܝ�\�

H��]\��\˜�\]Y\�
	��U	�	���Y[�ܙ\ܝX�\�	�N�B�\�[���]�Y[���Y�X�][ۜ�
H��]\��\˜�\]Y\�
	��U	�	���Y[�ۛ�Y�X�][ۜ��N�B�\�[���]][�[��J
H��]\��\˜�\]Y\�
	��U	�	���Y[��][�[��I�N�B�\�[��XX�\�\���\�

H��]\��\˜�\]Y\�
	��U	�	��XX�\��\���\�	�N�B�\�[��\�Y�۝[�

H��]\���Y�NHN�B�\�[���]�۝[�

H��]\��\˜�\]Y\�
	��U	�	��XX�\���۝[�	�N�B�\�[���]X�T�]�Y]�]Y]YJ
H��]\��\˜�\]Y\�
	��U	�	��XX�\��X�Kܙ]�Y]��N�B�\�[���]�Y]�X�JY
H��]\����]\Έ	ܙ]�Y]�Y	�N�B�\�[���]�\��[�[]X����H��]\��\˜�\]Y\�
	��U	�	��XX�\��[�[]X����\���N�B�\�[���]\��[]Y�X��
H��]\��\˜�\]Y\�
	��U	�	��XX�\���X���N�B�\�[���\�ۙ��X�
Y�H��]\����]\Έ	ܙ\�ۙY	�N�B�\�[���]XX�\��Y]�ܚ�
H��]\��\˜�\]Y\�
	��U	�	��XX�\���Y]�ܚ��N�B�\�[���]XX�\���Y�X�][ۜ�
H��]\��\˜�\]Y\�
	��U	�	��XX�\�ۛ�Y�X�][ۜ��N�B�\�[��\�[�\���\�

H��]\��\˜�\]Y\�
	��U	�	��\�[��\���\�	�N�B�\�[���]�[�\
�H��]\��\˜�\]Y\�
	��U	��\�[���[���K��\
N�B�\�[���]�[[��Y�[Y[�
�H��]\���[[X\�N���^SZ[�]\ΈN
K�YZ�Z[�]\ΈL
MK��X��X��	�X][X]X���K�Z[N��]N�	̌��L�LM	�Z[�]\���YYY��
K�\��[ۗ���[��
�[X\�W��X��X��	�X][X]X���K��]N�	̌��L�LMI�Z[�]\���YYY��L�\��[ۗ���[��
K�[X\�W��X��X��	К[���I�K��]N�	̌��L�LM��Z[�]\���YYY�NMK�\��[ۗ���[����[X\�W��X��X��	�\�X���K��]N�	̌��L�LM��Z[�]\���YYY���\��[ۗ���[��
�[X\�W��X��X��	�X][X]X���K��]N�	̌��L�LN	�Z[�]\���YYY���\��[ۗ���[��
��[X\�W��X��X��	К[���I�K��]N�	̌��L�LNI�Z[�]\���YYY���K�\��[ۗ���[��
�[X\�W��X��X��	�X][X]X���K��]N�	̌��L�L�	�Z[�]\���YYY����\��[ۗ���[����[X\�W��X��X��	�\�X���K�K��W��X��X����X��X�ۘ[YN�	�X][X]X����[�Z[�]\Έ
͌�\��[ۗ���[��M��܎�	��؎����K���X��X�ۘ[YN�	К[���I��[�Z[�]\Έ
NMK�\��[ۗ���[��L���܎�	��L�NI�K���X��X�ۘ[YN�	�\�X����[�Z[�]\Έ
L�\��[ۗ���[��L��܎�	�ٍNYL��K�K�N�B�\�[���]�ۜ�[��
H��]\��\˜�\]Y\�
	��U	�	��\�[���ۜ�[�	�N�B�\�[��\]P�ۜ�[�

H��]\����]\Έ	�\]Y	�N�B�\�[���]\�[���Y�X�][ۜ�
H��]\��\˜�\]Y\�
	��U	�	��\�[�ۛ�Y�X�][ۜ��N�B�\�[��X\�ӛ�Y�X�][۔�XY
Y
H��]\����]\Έ	ܙXY	�N�B�\�[��YZ[�\���\�

H��]\��\˜�\]Y\�
	��U	�	��YZ[��\���\�	�N�B�\�[���]�Y[��
H��]\��\˜�\]Y\�
	��U	�	��YZ[���Y[���N�B�\�[���]ZU\�Y�J
H��]\��\˜�\]Y\�
	��U	�	��YZ[��ZK]\�Y�I�N�B�\�[���]�\�[R[���
H��]\��\˜�\]Y\�
	��U	�	��YZ[���\�[I�N�B�\�[���]�X���H��]\��\˜�\]Y\�
	��U	�	��YZ[���X���N�B�\�[��ܙX]U�X�
H��]\���Y�NHN�B�\�[�����Y�\���Y�X�][ۊ
H��]\����]\Έ	�]Y]YY	�N�B�\�[���]YZ[���Y�X�][ۜ�
H��]\��\˜�\]Y\�
	��U	�	��YZ[�ۛ�Y�X�][ۜ��N�B�\�[���[��\[ݙ\��Y]�
H��]\��\˜�\]Y\�
	��U	�	���[��\[�ݙ\��Y]��N�B�\�[��XX�\�Y��X�]�[�\��
H��]\��\˜�\]Y\�
	��U	�	���[��\[�XX�\�YY��X�]�[�\���N�B�\�[���\����\\�\�ۊ
H��]\��\˜�\]Y\�
	��U	�	���[��\[��\��X��\\�\�ۉ�N�B�\�[��[۝T�[[X\�J
H��]\��\˜�\]Y\�
	��U	�	���[��\[�[۝K\�[[X\�I�N�B�\�[���]���\��]�
H��]\��\˜�\]Y\�
	��U	�	���Y[�ٛ��\���]��N�B�\�[���]�[���\�]Y]
�
H��]\��\˜�\]Y\�
	��U	���Y[�ٛ��\���[���K�]Y]
N�B�\�[���]�[���\��][����H��]\��\˜�\]Y\�
	��U	���Y[�ٛ��\���[���K��][���
N�B�\�[��\]P�[���\��][����
H��]\����][��ΈN�B�\�[���]�������\ԙ\ܝ

H��]\��\˜�\]Y\�
	��U	�	���Y[�ٛ��\������\�\ܝ	�N�B�\�[���][��\��]Y�ܚY\�
H��]\��\˜�\]Y\�
	��U	�	��[��\���]Y�ܚY\��N�B�\�[��ܙX]T[��\��]Y�ܞJ
H��]\����]Y�ܞN��Y�NK���HN�B�\�[���][��\�[\]\��H��]\���[\]\Έ�HN�B�\�[��ܙX]T[��\�[\]J
H��]\���[\]N��Y�K���HN�B�\�[��X�]�]T[��\�[\]JY
H��]\����]\Έ	�X�]�]Y	�N�B�\�[���][��\�[��Y\��
H��]\��\˜�\]Y\�
	��U	��[��\��[��Y\����X
N�B�\�[��ܙX]T[��\�[��J
H��]\���[��RY�NHN�B�\�[��\]T[��\�[��JY
H��]\����]\Έ	�\]Y	�N�B�\�[��[]T[��\�[��JY
H��]\����]\Έ	�[]Y	�N�B�\�[��X\��[��\���\][ۊ
H��]\�����\][ےY�HN�B�\�[���][��\���\][ۜ��
H��]\��\˜�\]Y\�
	��U	��[��\����\][ۜ����X
N�B�\�[���][��\�[��Y���
H��]\��\˜�\]Y\�
	��U	��[��\��[��Y�����X
N�B�\�[���]^T��Y[J
H��]\��\˜�\]Y\�
	��U	�	��[��\��^K\��Y[I�N�B�B���[��˘\HH�]��X\��YPTJ
N�
