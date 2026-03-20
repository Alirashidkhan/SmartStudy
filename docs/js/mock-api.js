// ============================================================
// SmartStudy v1.0 â Mock API for GitHub Pages Demo
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
      { id: 1, question: 'Why does photosynthesis need sunlight?', ai_response: 'Sunlight provides the energy needed to convert COâ and HâO into glucose. The light reactions in chloroplasts use photons to split water molecules and create ATP.', status: 'resolved', created_at: '2026-03-19T10:30:00Z' },
      { id: 2, question: 'Difference between mitosis and meiosis?', ai_response: 'Mitosis produces 2 identical diploid cells (for growth/repair). Meiosis produces 4 unique haploid cells (for reproduction). Meiosis has crossing over and two divisions.', status: 'resolved', created_at: '2026-03-18T14:20:00Z' },
    ]};
    if (path === '/student/gamification') return this._gamification();
    if (path === '/student/study-plans') return { plans: [
      { id: 1, title: 'Biology Week Plan', plan_data: { topics: ['Cell Biology', 'Genetics', 'Ecology'] }, status: 'active', created_at: '2026-03-17' },
    ]};
    if (path === '/student/focus/stats') return this._focusStats();

    // Teacher
    if (path === '/teacher/dashboard') return this._teacherDashboard();
    if (path.startsWith('/teacher/content')) return { content: [
      { id: 1, title: 'Photosynthesis â Complete Guide', content_type: 'text', subject_id: 1, created_at: '2026-03-15' },
      { id: 2, title: 'Newton\'s Laws of Motion', content_type: 'text', subject_id: 2, created_at: '2026-03-14' },
      { id: 3, title: 'Linear Equations Practice', content_type: 'pdf', subject_id: 3, created_at: '2026-03-13' },
    ]};
    if (path.startsWith('/teacher/mcq/review')) return this._mcqReview();
    if (path.startsWith('/teacher/analytics')) return this._classAnalytics();
    if (path === '/teacher/doubts') return { doubts: [
      { id: 3, question: 'Can you explain the Krebs cycle in simpler terms?', student_id: 1, status: 'escalated', created_at: '2026-03-19' },
    ]};

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
      sip: { subjects: [
        { subject_id: 1, subject_name: 'Biology', composite_sip: 72.5, trend: 'improving' },
        { subject_id: 2, subject_name: 'Physics', composite_sip: 58.3, trend: 'stable' },
        { subject_id: 3, subject_name: 'Mathematics', composite_sip: 81.2, trend: 'improving' },
      ]},
      streak: { current_streak: 12, longest_streak: 18, total_points: 2450, level: 5 },
      pendingRevisions: 3,
      recentActivity: [
        { type: 'mcq', detail: 'Biology MCQ â 8/10 correct', created_at: '2026-03-19T15:30:00Z' },
        { type: 'content', detail: 'Read "Photosynthesis Guide"', created_at: '2026-03-19T14:00:00Z' },
        { type: 'revision', detail: 'Completed Cell Biology revision', created_at: '2026-03-18T16:00:00Z' },
      ],
    };
  }

  _mcqPractice() {
    return { questions: [
      { id: 1, question_text: 'Which organelle is responsible for photosynthesis?', options: [{key:'A',text:'Mitochondria'},{key:'B',text:'Chloroplast'},{key:'C',text:'Ribosome'},{key:'D',text:'Golgi Body'}], difficulty: 'Medium' },
      { id: 2, question_text: 'What is the powerhouse of the cell?', options: [{key:'A',text:'Nucleus'},{key:'B',text:'Chloroplast'},{key:'C',text:'Mitochondria'},{key:'D',text:'ER'}], difficulty: 'Easy' },
      { id: 3, question_text: 'DNA replication occurs during which phase?', options: [{key:'A',text:'G1 phase'},{key:'B',text:'S phase'},{key:'C',text:'G2 phase'},{key:'D',text:'M phase'}], difficulty: 'Medium' },
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
        { name: '7-Day Streak', icon: 'ð¥', earned_at: '2026-03-10' },
        { name: 'First MCQ Perfect', icon: 'ð', earned_at: '2026-03-05' },
        { name: 'Biology Master', icon: 'ð§¬', earned_at: '2026-03-12' },
        { name: 'Quick Learner', icon: 'â¡', earned_at: '2026-03-08' },
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

  // Teacher
  _teacherDashboard() {
    return {
      pendingMcqs: 8,
      totalContent: 24,
      classStats: { avg_sip: 65.4, total_students: 45, active_today: 32 },
      escalatedDoubts: 2,
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
      sipDistribution: { excellent: 8, good: 15, average: 14, low: 8 },
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
      { id: 1, name: 'Study', icon: 'ð', color: '#4F46E5', sort_order: 1 },
      { id: 2, name: 'Homework', icon: 'ð', color: '#7C3AED', sort_order: 2 },
      { id: 3, name: 'Revision', icon: 'ð', color: '#6366F1', sort_order: 3 },
      { id: 4, name: 'MCQ Practice', icon: 'â', color: '#8B5CF6', sort_order: 4 },
      { id: 5, name: 'Tuition', icon: 'ð¨âð«', color: '#A78BFA', sort_order: 5 },
      { id: 6, name: 'Sports', icon: 'â½', color: '#10B981', sort_order: 6 },
      { id: 7, name: 'Outdoor Play', icon: 'ð', color: '#34D399', sort_order: 7 },
      { id: 8, name: 'Music', icon: 'ðµ', color: '#F59E0B', sort_order: 8 },
      { id: 9, name: 'Art & Craft', icon: 'ð¨', color: '#F97316', sort_order: 9 },
      { id: 10, name: 'Reading', icon: 'ð', color: '#3B82F6', sort_order: 10 },
      { id: 11, name: 'Screen Time', icon: 'ð±', color: '#EF4444', sort_order: 11 },
      { id: 12, name: 'Meal', icon: 'ð½ï¸', color: '#84CC16', sort_order: 12 },
      { id: 13, name: 'Breakfast', icon: 'ð¥£', color: '#A3E635', sort_order: 13 },
      { id: 14, name: 'Lunch', icon: 'ð±', color: '#65A30D', sort_order: 14 },
      { id: 15, name: 'Dinner', icon: 'ð', color: '#4D7C0F', sort_order: 15 },
      { id: 16, name: 'Sleep', icon: 'ð´', color: '#6B7280', sort_order: 17 },
      { id: 17, name: 'Bath / Hygiene', icon: 'ð¿', color: '#06B6D4', sort_order: 19 },
      { id: 18, name: 'Family Time', icon: 'ð¨âð©âð§âð¦', color: '#EC4899', sort_order: 20 },
      { id: 19, name: 'Free Time', icon: 'ð®', color: '#F472B6', sort_order: 22 },
    ]};
  }

  _plannerEntries() {
    return { entries: [
      // Monday
      { id: 1, day_of_week: 1, start_time: '06:30:00', end_time: '07:00:00', title: 'Wake up & Bath', category_name: 'Bath / Hygiene', category_icon: 'ð¿', category_color: '#06B6D4' },
      { id: 2, day_of_week: 1, start_time: '07:00:00', end_time: '07:30:00', title: null, category_name: 'Breakfast', category_icon: 'ð¥£', category_color: '#A3E635' },
      { id: 3, day_of_week: 1, start_time: '08:00:00', end_time: '10:00:00', title: 'Math + Science', category_name: 'Study', category_icon: 'ð', category_color: '#4F46E5' },
      { id: 4, day_of_week: 1, start_time: '10:00:00', end_time: '10:30:00', title: null, category_name: 'Outdoor Play', category_icon: 'ð', category_color: '#34D399' },
      { id: 5, day_of_week: 1, start_time: '10:30:00', end_time: '11:30:00', title: 'Biology revision', category_name: 'Revision', category_icon: 'ð', category_color: '#6366F1' },
      { id: 6, day_of_week: 1, start_time: '12:00:00', end_time: '12:30:00', title: null, category_name: 'Lunch', category_icon: 'ð±', category_color: '#65A30D' },
      { id: 7, day_of_week: 1, start_time: '14:00:00', end_time: '15:00:00', title: null, category_name: 'Homework', category_icon: 'ð', category_color: '#7C3AED' },
      { id: 8, day_of_week: 1, start_time: '16:00:00', end_time: '17:00:00', title: 'Cricket', category_name: 'Sports', category_icon: 'â½', category_color: '#10B981' },
      { id: 9, day_of_week: 1, start_time: '17:30:00', end_time: '18:30:00', title: null, category_name: 'Tuition', category_icon: 'ð¨âð«', category_color: '#A78BFA' },
      { id: 10, day_of_week: 1, start_time: '19:00:00', end_time: '19:30:00', title: null, category_name: 'Dinner', category_icon: 'ð', category_color: '#4D7C0F' },
      { id: 11, day_of_week: 1, start_time: '19:30:00', end_time: '20:00:00', title: null, category_name: 'Screen Time', category_icon: 'ð±', category_color: '#EF4444' },
      { id: 12, day_of_week: 1, start_time: '21:00:00', end_time: '06:30:00', title: null, category_name: 'Sleep', category_icon: 'ð´', category_color: '#6B7280' },
      // Tuesday
      { id: 13, day_of_week: 2, start_time: '06:30:00', end_time: '07:00:00', title: 'Wake up', category_name: 'Bath / Hygiene', category_icon: 'ð¿', category_color: '#06B6D4' },
      { id: 14, day_of_week: 2, start_time: '07:00:00', end_time: '07:30:00', title: null, category_name: 'Breakfast', category_icon: 'ð¥£', category_color: '#A3E635' },
      { id: 15, day_of_week: 2, start_time: '08:00:00', end_time: '10:00:00', title: 'English + Hindi', category_name: 'Study', category_icon: 'ð', category_color: '#4F46E5' },
      { id: 16, day_of_week: 2, start_time: '10:30:00', end_time: '11:00:00', title: null, category_name: 'MCQ Practice', category_icon: 'â', category_color: '#8B5CF6' },
      { id: 17, day_of_week: 2, start_time: '15:00:00', end_time: '16:00:00', title: 'Piano class', category_name: 'Music', category_icon: 'ðµ', category_color: '#F59E0B' },
      { id: 18, day_of_week: 2, start_time: '17:00:00', end_time: '18:00:00', title: null, category_name: 'Sports', category_icon: 'â½', category_color: '#10B981' },
      // Wed-Sun have some entries too
      { id: 19, day_of_week: 3, start_time: '08:00:00', end_time: '10:00:00', title: 'Physics + Chemistry', category_name: 'Study', category_icon: 'ð', category_color: '#4F46E5' },
      { id: 20, day_of_week: 3, start_time: '16:00:00', end_time: '17:00:00', title: null, category_name: 'Art & Craft', category_icon: 'ð¨', category_color: '#F97316' },
      { id: 21, day_of_week: 4, start_time: '08:00:00', end_time: '10:00:00', title: 'Math + Biology', category_name: 'Study', category_icon: 'ð', category_color: '#4F46E5' },
      { id: 22, day_of_week: 4, start_time: '15:00:00', end_time: '16:00:00', title: null, category_name: 'Tuition', category_icon: 'ð¨âð«', category_color: '#A78BFA' },
      { id: 23, day_of_week: 5, start_time: '08:00:00', end_time: '09:30:00', title: 'Weekly test prep', category_name: 'Revision', category_icon: 'ð', category_color: '#6366F1' },
      { id: 24, day_of_week: 5, start_time: '16:00:00', end_time: '17:30:00', title: 'Football', category_name: 'Sports', category_icon: 'â½', category_color: '#10B981' },
      { id: 25, day_of_week: 6, start_time: '09:00:00', end_time: '10:00:00', title: null, category_name: 'Reading', category_icon: 'ð', category_color: '#3B82F6' },
      { id: 26, day_of_week: 6, start_time: '16:00:00', end_time: '18:00:00', title: null, category_name: 'Family Time', category_icon: 'ð¨âð©âð§âð¦', category_color: '#EC4899' },
      { id: 27, day_of_week: 0, start_time: '10:00:00', end_time: '11:00:00', title: 'Light revision', category_name: 'Revision', category_icon: 'ð', category_color: '#6366F1' },
      { id: 28, day_of_week: 0, start_time: '15:00:00', end_time: '17:00:00', title: null, category_name: 'Free Time', category_icon: 'ð®', category_color: '#F472B6' },
    ]};
  }

  _plannerInsights() {
    return {
      date: '2026-03-20', dayOfWeek: 4,
      entries: [],
      summary: { totalPlannedMin: 540, studyMin: 180, activityMin: 120, screenTimeMin: 30, sleepMin: 540, completedCount: 6, totalCount: 10 },
      warnings: ['Consider adding outdoor activity today'],
    };
  }

  _mySchedule() {
    return { today: [
      { id: 3, start_time: '08:00:00', end_time: '10:00:00', title: 'Math + Science', category_name: 'Study', icon: 'ð', color: '#4F46E5' },
      { id: 7, start_time: '14:00:00', end_time: '15:00:00', title: null, category_name: 'Homework', icon: 'ð', color: '#7C3AED' },
      { id: 8, start_time: '16:00:00', end_time: '17:00:00', title: 'Cricket', category_name: 'Sports', icon: 'â½', color: '#10B981' },
    ]};
  }

  // Admin
  _adminDashboard() {
    return {
      overview: { totalStudents: 450, totalTeachers: 28, integrationMode: 'standalone' },
      content: { total: 342 },
      mcq: { approved: 1240, pendingReview: 48 },
      sip: { school_avg_sip: 64.7, at_risk_count: 38 },
      engagement: { active_students: 312 },
      ai: { total_requests: 8540, total_cost: '42.30', avg_latency_ms: 1200, failures: 12 },
      dailyActiveStudents: [
        { date: '2026-03-14', active_students: 285 },
        { date: '2026-03-15', active_students: 142 },
        { date: '2026-03-16', active_students: 98 },
        { date: '2026-03-17', active_students: 310 },
        { date: '2026-03-18', active_students: 298 },
        { date: '2026-03-19', active_students: 305 },
        { date: '2026-03-20', active_students: 312 },
      ],
    };
  }

  _adminStudents() {
    return { students: [
      { id: 1, first_name: 'Arjun', last_name: 'Kumar', avg_sip: 72.5, streak: 12, points: 2450 },
      { id: 2, first_name: 'Riya', last_name: 'Sharma', avg_sip: 78.2, streak: 8, points: 2280 },
      { id: 3, first_name: 'Karan', last_name: 'Mehta', avg_sip: 65.1, streak: 5, points: 2150 },
      { id: 4, first_name: 'Ananya', last_name: 'Patel', avg_sip: 82.4, streak: 15, points: 3100 },
      { id: 5, first_name: 'Vikram', last_name: 'Singh', avg_sip: 45.3, streak: 2, points: 890 },
      { id: 6, first_name: 'Priti', last_name: 'Gupta', avg_sip: 71.8, streak: 9, points: 1950 },
    ]};
  }

  _aiUsage() {
    return {
      byType: [
        { request_type: 'mcq_generation', count: 3200, cost: '18.50', avg_latency: 1400 },
        { request_type: 'doubt_solving', count: 2800, cost: '15.20', avg_latency: 1100 },
        { request_type: 'study_plan', count: 1540, cost: '5.80', avg_latency: 900 },
        { request_type: 'content_summary', count: 1000, cost: '2.80', avg_latency: 800 },
      ],
      byModel: [
        { model_used: 'gpt-4o-mini', count: 6200, cost: '35.00' },
        { model_used: 'gemini-2.0-flash', count: 2340, cost: '7.30' },
      ],
    };
  }

  _systemInfo() {
    return {
      version: '1.0.0', integrationMode: 'standalone', nodeVersion: 'v22.12.0', uptime: 86400,
      database: { totalConnections: 8, maxConnections: 20, utilizationPct: 40 },
      ai: { openaiConfigured: true, geminiConfigured: true, studentDailyLimit: 50 },
    };
  }

  _topics() {
    return { topics: [
      { id: 1, name: 'Photosynthesis', chapter_number: 1, board: 'CBSE', difficulty_level: 'Medium' },
      { id: 2, name: 'Cell Biology', chapter_number: 2, board: 'CBSE', difficulty_level: 'Easy' },
      { id: 3, name: 'Genetics & Heredity', chapter_number: 3, board: 'CBSE', difficulty_level: 'Hard' },
      { id: 4, name: 'Newton\'s Laws', chapter_number: 1, board: 'CBSE', difficulty_level: 'Medium' },
      { id: 5, name: 'Electromagnetic Induction', chapter_number: 5, board: 'CBSE', difficulty_level: 'Hard' },
    ]};
  }

  // Principal
  _principalOverview() {
    return {
      school: { totalStudents: 450, totalTeachers: 28, integrationMode: 'standalone' },
      sip: { avg_sip: 64.7, median_sip: 62.3, excellent: 52, good: 145, average: 168, needs_help: 85 },
      subjectBreakdown: [
        { subject_id: 1, avg_sip: 68.4, student_count: 420, improving: 180, declining: 45 },
        { subject_id: 2, avg_sip: 58.2, student_count: 410, improving: 120, declining: 85 },
        { subject_id: 3, avg_sip: 72.1, student_count: 440, improving: 210, declining: 35 },
      ],
      engagementTrend: [
        { week: '2026-02-24', active_students: 280, total_hours: 1420, avg_session_min: 38 },
        { week: '2026-03-03', active_students: 310, total_hours: 1580, avg_session_min: 42 },
        { week: '2026-03-10', active_students: 325, total_hours: 1650, avg_session_min: 40 },
        { week: '2026-03-17', active_students: 340, total_hours: 1720, avg_session_min: 44 },
      ],
      revisionCompliance: { complianceRate: 72, completed: 2840, overdue: 580, skipped: 520 },
      ai: { total_requests: 8540, total_cost: '42.30', failures: 12 },
      atRiskStudents: [
        { student_id: 5, subject_id: 2, composite_sip: 32.4, trend: 'declining' },
        { student_id: 12, subject_id: 1, composite_sip: 28.8, trend: 'declining' },
        { student_id: 18, subject_id: 3, composite_sip: 35.1, trend: 'stable' },
      ],
      topPerformers: [
        { student_id: 4, subject_id: 3, composite_sip: 92.5, trend: 'improving' },
        { student_id: 2, subject_id: 1, composite_sip: 88.3, trend: 'improving' },
        { student_id: 1, subject_id: 3, composite_sip: 81.2, trend: 'improving' },
      ],
    };
  }

  _teacherEffectiveness() {
    return { teachers: [
      { teacher_id: 1, content_pieces: 45, mcqs_created: 280 },
      { teacher_id: 2, content_pieces: 38, mcqs_created: 195 },
      { teacher_id: 3, content_pieces: 32, mcqs_created: 210 },
      { teacher_id: 4, content_pieces: 28, mcqs_created: 165 },
      { teacher_id: 5, content_pieces: 22, mcqs_created: 120 },
    ]};
  }

  _classComparison() {
    return { classes: [
      { class_id: 8, section_id: 'A', avg_sip: 71.2, student_count: 45 },
      { class_id: 8, section_id: 'B', avg_sip: 64.8, student_count: 42 },
      { class_id: 9, section_id: 'A', avg_sip: 68.5, student_count: 48 },
      { class_id: 9, section_id: 'B', avg_sip: 62.1, student_count: 44 },
      { class_id: 10, section_id: 'A', avg_sip: 66.3, student_count: 40 },
      { class_id: 10, section_id: 'B', avg_sip: 59.4, student_count: 38 },
    ]};
  }

  _monthlySummary() {
    return {
      monthlyEngagement: [
        { month: '2025-10-01', active_students: 280, total_hours: 5200 },
        { month: '2025-11-01', active_students: 310, total_hours: 5800 },
        { month: '2025-12-01', active_students: 250, total_hours: 4500 },
        { month: '2026-01-01', active_students: 320, total_hours: 6100 },
        { month: '2026-02-01', active_students: 340, total_hours: 6400 },
        { month: '2026-03-01', active_students: 350, total_hours: 6800 },
      ],
      monthlyMcq: [
        { month: '2025-10-01', total_answers: 12000, correct_answers: 7800 },
        { month: '2025-11-01', total_answers: 14500, correct_answers: 9500 },
        { month: '2025-12-01', total_answers: 10200, correct_answers: 6800 },
        { month: '2026-01-01', total_answers: 15800, correct_answers: 10900 },
        { month: '2026-02-01', total_answers: 16500, correct_answers: 11600 },
        { month: '2026-03-01', total_answers: 17200, correct_answers: 12400 },
      ],
      monthlyDoubts: [
        { month: '2025-10-01', total_doubts: 450, resolved_doubts: 380 },
        { month: '2025-11-01', total_doubts: 520, resolved_doubts: 460 },
        { month: '2025-12-01', total_doubts: 380, resolved_doubts: 340 },
        { month: '2026-01-01', total_doubts: 580, resolved_doubts: 530 },
        { month: '2026-02-01', total_doubts: 610, resolved_doubts: 565 },
        { month: '2026-03-01', total_doubts: 640, resolved_doubts: 600 },
      ],
    };
  }

  // Convenience wrappers matching api.js interface
  async login(u, p) { return this.request('POST', '/auth/login', { username: u, password: p }); }
  async logout() { return this.request('POST', '/auth/logout'); }
  async me() { return this.request('GET', '/auth/me'); }
  async studentDashboard() { return this.request('GET', '/student/dashboard'); }
  async startEngagement(d) { return { sessionId: 1, startTime: new Date().toISOString() }; }
  async heartbeat(d) { return { status: 'ok' }; }
  async endEngagement(d) { return { status: 'completed' }; }
  async getMcqPractice(t, c) { return this.request('GET', `/student/mcq/practice?topicId=${t}&count=${c}`); }
  async submitMcqAnswer(d) { return this.request('POST', '/student/mcq/answer', d); }
  async getSipScores() { return this.request('GET', '/student/sip'); }
  async getRevisions() { return this.request('GET', '/student/revisions'); }
  async completeRevision(id) { return { status: 'completed' }; }
  async askDoubt(d) { return { id: 99, ai_response: 'Great question! Let me explain...' }; }
  async getDoubts() { return this.request('GET', '/student/doubts'); }
  async getGamification() { return this.request('GET', '/student/gamification'); }
  async getStudyPlans() { return this.request('GET', '/student/study-plans'); }
  async teacherDashboard() { return this.request('GET', '/teacher/dashboard'); }
  async uploadContent(d) { return { id: 99 }; }
  async getContent(p) { return this.request('GET', '/teacher/content'); }
  async getMcqReviewQueue(p) { return this.request('GET', '/teacher/mcq/review'); }
  async reviewMcq(id, d) { return { status: 'reviewed' }; }
  async getClassAnalytics(c, s) { return this.request('GET', '/teacher/analytics/class'); }
  async getEscalatedDoubts() { return this.request('GET', '/teacher/doubts'); }
  async respondToDoubt(id, r) { return { status: 'responded' }; }
  async parentDashboard() { return this.request('GET', '/parent/dashboard'); }
  async getChildSip(s) { return this.request('GET', `/parent/child/${s}/sip`); }
  async getChildEngagement(s) { return { sessions: [] }; }
  async getConsents() { return this.request('GET', '/parent/consent'); }
  async updateConsent(d) { return { status: 'updated' }; }
  async getParentNotifications() { return this.request('GET', '/parent/notifications'); }
  async markNotificationRead(id) { return { status: 'read' }; }
  async adminDashboard() { return this.request('GET', '/admin/dashboard'); }
  async getStudents(p) { return this.request('GET', '/admin/students'); }
  async getAiUsage(d) { return this.request('GET', '/admin/ai-usage'); }
  async getSystemInfo() { return this.request('GET', '/admin/system'); }
  async getTopics(s) { return this.request('GET', '/admin/topics'); }
  async createTopic(d) { return { id: 99 }; }
  async broadcastNotification(d) { return { status: 'queued' }; }
  async principalOverview() { return this.request('GET', '/principal/overview'); }
  async teacherEffectiveness() { return this.request('GET', '/principal/teacher-effectiveness'); }
  async classComparison() { return this.request('GET', '/principal/class-comparison'); }
  async monthlySummary() { return this.request('GET', '/principal/monthly-summary'); }
  async getFocusStats() { return this.request('GET', '/student/focus/stats'); }
  async getChildFocusAudit(s, d) { return this.request('GET', `/student/focus/child/${s}/audit`); }
  async getChildFocusSettings(s) { return this.request('GET', `/student/focus/child/${s}/settings`); }
  async updateChildFocusSettings(s, d) { return { settings: d }; }
  async getSchoolFocusReport() { return this.request('GET', '/student/focus/school-report'); }
  async getPlannerCategories() { return this.request('GET', '/planner/categories'); }
  async createPlannerCategory(d) { return { category: { id: 99, ...d } }; }
  async getPlannerTemplates(s) { return { templates: [] }; }
  async createPlannerTemplate(d) { return { template: { id: 1, ...d } }; }
  async activatePlannerTemplate(id) { return { status: 'activated' }; }
  async getPlannerEntries(s, p) { return this.request('GET', `/planner/entries/${s}`); }
  async createPlannerEntry(d) { return { entryId: 99 }; }
  async updatePlannerEntry(id, d) { return { status: 'updated' }; }
  async deletePlannerEntry(id) { return { status: 'deleted' }; }
  async markPlannerCompletion(d) { return { completionId: 1 }; }
  async getPlannerCompletions(s, p) { return this.request('GET', `/planner/completions/${s}`); }
  async getPlannerInsights(s, d) { return this.request('GET', `/planner/insights/${s}`); }
  async getMySchedule() { return this.request('GET', '/planner/my-schedule'); }
}

window.api = new SmartStudyAPI();
