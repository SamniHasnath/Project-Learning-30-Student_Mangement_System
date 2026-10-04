const state = { students: [], editingId: null, saving: false };
const $ = (id) => document.getElementById(id);
const FIELDS = ['name', 'email', 'course', 'year', 'status', 'phone'];
const COURSES = ['Accounting', 'Architecture', 'Biology', 'Business Administration', 'Chemistry', 'Civil Engineering', 'Computer Science', 'Economics', 'Electrical Engineering', 'English Literature', 'Environmental Science', 'Information Technology', 'Law', 'Mathematics', 'Mechanical Engineering', 'Medicine', 'Nursing', 'Physics', 'Product Design', 'Psychology', 'Software Engineering'];
const OTHER = '__other';
const VIEWS = { students: 'Students', insights: 'Insights', settings: 'Settings' };

async function request(url, options = {}) {
  const response = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
  if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.error || 'Something went wrong.'); }
  return response.status === 204 ? null : response.json();
}

function escapeHtml(value = '') { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char])); }
function initials(name) { return name.split(/\s+/).filter(Boolean).map((part) => part[0]).slice(0, 2).join('').toUpperCase(); }
function statusClass(status) { return status.toLowerCase().replace(' ', '-'); }
function percent(part, total) { return total ? Math.round((part / total) * 100) : 0; }
function countBy(list, key) { return list.reduce((counts, item) => { counts[item[key]] = (counts[item[key]] || 0) + 1; return counts; }, {}); }

const sorters = {
  name: (a, b) => a.name.localeCompare(b.name),
  newest: (a, b) => String(b.createdAt).localeCompare(String(a.createdAt)),
  year: (a, b) => a.year.localeCompare(b.year) || a.name.localeCompare(b.name),
  course: (a, b) => a.course.localeCompare(b.course) || a.name.localeCompare(b.name)
};

/* ---------- Students view ---------- */
function renderStudents() {
  const filter = $('statusFilter').value;
  const query = $('searchInput').value.toLowerCase().trim();
  const filtered = state.students
    .filter((student) => (filter === 'All' || student.status === filter) && [student.name, student.email, student.course, student.phone || ''].some((value) => value.toLowerCase().includes(query)))
    .sort(sorters[$('sortSelect').value]);
  $('studentsTable').innerHTML = filtered.map((student) => `<tr><td><div class="student-cell"><div class="student-avatar">${escapeHtml(initials(student.name))}</div><div><strong>${escapeHtml(student.name)}</strong><small>${escapeHtml(student.email)}</small></div></div></td><td>${escapeHtml(student.course)}</td><td>${escapeHtml(student.year)}</td><td><span class="status ${statusClass(student.status)}"><i></i>${escapeHtml(student.status)}</span></td><td><div class="contact"><span>${escapeHtml(student.phone || 'No phone')}</span><small>${escapeHtml(student.email)}</small></div></td><td><div class="row-actions"><button data-edit="${student.id}" aria-label="Edit ${escapeHtml(student.name)}" title="Edit">✎</button><button data-delete="${student.id}" aria-label="Delete ${escapeHtml(student.name)}" title="Delete">⌫</button></div></td></tr>`).join('');
  $('emptyState').hidden = filtered.length !== 0;
  $('recordSummary').textContent = `Showing ${filtered.length} of ${state.students.length} students`;

  const total = state.students.length;
  const active = state.students.filter((student) => student.status === 'Active').length;
  const leave = state.students.filter((student) => student.status === 'On leave').length;
  const graduating = state.students.filter((student) => student.year === 'Year 4' && student.status !== 'Graduated').length;
  $('totalStudents').textContent = total;
  $('activeStudents').textContent = active;
  $('leaveStudents').textContent = leave;
  $('graduatingStudents').textContent = graduating;
  $('activeNote').textContent = `${percent(active, total)}% of total`;
  $('leaveNote').textContent = `${percent(leave, total)}% of total`;
  $('navCount').textContent = total;
  renderCourseOptions();
}

/* ---------- Course picker ---------- */
// The dropdown lists the preset courses plus any custom course already saved, so a course typed once can be picked next time.
function renderCourseOptions() {
  const select = $('courseSelect');
  const current = select.value;
  const courses = [...new Set([...COURSES, ...state.students.map((student) => student.course)])].sort((a, b) => a.localeCompare(b));
  select.innerHTML = '<option value="">Select course</option>' + courses.map((course) => `<option value="${escapeHtml(course)}">${escapeHtml(course)}</option>`).join('') + `<option value="${OTHER}">Other (type your own)</option>`;
  select.value = current;
}

function toggleCourseOther() {
  const isOther = $('courseSelect').value === OTHER;
  $('courseOtherField').hidden = !isOther;
  $('courseOther').required = isOther;
  if (isOther) $('courseOther').focus();
}

function setCourse(course) {
  const known = [...$('courseSelect').options].some((option) => option.value === course);
  $('courseSelect').value = !course ? '' : known ? course : OTHER;
  $('courseOther').value = known ? '' : course;
  $('courseOtherField').hidden = $('courseSelect').value !== OTHER;
  $('courseOther').required = $('courseSelect').value === OTHER;
}

function selectedCourse() {
  return $('courseSelect').value === OTHER ? $('courseOther').value.trim() : $('courseSelect').value;
}

/* ---------- Insights view ---------- */
function barList(counts, order, colorFor = () => 'teal') {
  const total = state.students.length;
  const keys = order || Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
  if (!keys.length || !total) return '<p class="panel-note">No students yet.</p>';
  return keys.map((key) => {
    const value = counts[key] || 0;
    return `<div class="bar-row"><div class="bar-label"><span>${escapeHtml(key)}</span><strong>${value} <em>${percent(value, total)}%</em></strong></div><div class="bar-track"><div class="bar-fill ${colorFor(key)}" style="width:${percent(value, total)}%"></div></div></div>`;
  }).join('');
}

function renderInsights() {
  const statusColors = { Active: 'teal', 'On leave': 'yellow', Graduated: 'blue' };
  $('statusBreakdown').innerHTML = barList(countBy(state.students, 'status'), ['Active', 'On leave', 'Graduated'], (key) => statusColors[key]);
  $('yearBreakdown').innerHTML = barList(countBy(state.students, 'year'), ['Year 1', 'Year 2', 'Year 3', 'Year 4'], () => 'coral');
  $('courseBreakdown').innerHTML = barList(countBy(state.students, 'course'), null, () => 'blue');
  const recent = [...state.students].sort(sorters.newest).slice(0, 5);
  $('recentList').innerHTML = recent.length
    ? recent.map((student) => `<li><div class="student-avatar">${escapeHtml(initials(student.name))}</div><div><strong>${escapeHtml(student.name)}</strong><small>${escapeHtml(student.course)} · ${escapeHtml(student.year)}</small></div><time>${student.createdAt ? new Date(student.createdAt).toLocaleDateString() : ''}</time></li>`).join('')
    : '<li class="panel-note">No students yet.</li>';
}

function render() { renderStudents(); renderInsights(); }

/* ---------- Navigation ---------- */
function showView() {
  const view = VIEWS[location.hash.slice(1)] ? location.hash.slice(1) : 'students';
  Object.keys(VIEWS).forEach((name) => { $(`view-${name}`).hidden = name !== view; });
  document.querySelectorAll('.nav-item').forEach((link) => link.classList.toggle('active', link.dataset.view === view));
  $('breadcrumbView').textContent = VIEWS[view];
  document.title = `Student Management System | ${VIEWS[view]}`;
}

/* ---------- Data ---------- */
async function loadStudents() {
  if (location.protocol === 'file:') { $('recordSummary').textContent = 'Run "npm run dev" and open http://localhost:4000 to load records.'; return; }
  try { state.students = await request('/api/students'); render(); }
  catch (error) { $('recordSummary').textContent = 'Could not load records.'; showToast(error.message, true); }
}

function openModal(student = null) {
  state.editingId = student?.id || null;
  $('modalTitle').textContent = student ? 'Edit student' : 'Add student';
  $('saveButton').textContent = student ? 'Save changes' : 'Save student';
  FIELDS.forEach((field) => { $(field).value = student?.[field] || (field === 'status' ? 'Active' : ''); });
  setCourse(student?.course || '');
  $('formError').textContent = '';
  $('modalBackdrop').hidden = false;
  $('name').focus();
}
function closeModal() { $('modalBackdrop').hidden = true; state.editingId = null; }

let toastTimer;
function showToast(message, isError = false) {
  const toast = $('toast');
  toast.textContent = message;
  toast.className = `toast visible ${isError ? 'error' : ''}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 2800);
}

async function deleteStudent(id) {
  const student = state.students.find((item) => item.id === id);
  if (!student || !confirm(`Delete ${student.name}'s record?`)) return;
  try { await request(`/api/students/${id}`, { method: 'DELETE' }); showToast('Student record deleted.'); await loadStudents(); }
  catch (error) { showToast(error.message, true); }
}

function download(filename, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function toCsv(students) {
  const columns = ['name', 'email', 'course', 'year', 'status', 'phone', 'createdAt'];
  const cell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
  return [columns.join(','), ...students.map((student) => columns.map((column) => cell(student[column])).join(','))].join('\r\n');
}

async function importStudents(file) {
  let records;
  try {
    const parsed = JSON.parse(await file.text());
    records = Array.isArray(parsed) ? parsed : parsed.students;
    if (!Array.isArray(records)) throw new Error();
  } catch { showToast('That file is not a valid student JSON export.', true); return; }
  let added = 0, skipped = 0;
  for (const record of records) {
    const payload = Object.fromEntries(FIELDS.map((field) => [field, record[field] ?? '']));
    if (!payload.status) payload.status = 'Active';
    try { await request('/api/students', { method: 'POST', body: JSON.stringify(payload) }); added += 1; }
    catch { skipped += 1; }
  }
  await loadStudents();
  showToast(`Imported ${added} student${added === 1 ? '' : 's'}${skipped ? `, skipped ${skipped}` : ''}.`, added === 0 && skipped > 0);
}

/* ---------- Events ---------- */
$('addStudentButton').addEventListener('click', () => openModal());
$('closeModal').addEventListener('click', closeModal);
$('cancelModal').addEventListener('click', closeModal);
$('modalBackdrop').addEventListener('click', (event) => { if (event.target === $('modalBackdrop')) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !$('modalBackdrop').hidden) closeModal(); });

$('studentsTable').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.edit) openModal(state.students.find((student) => student.id === Number(button.dataset.edit)));
  if (button.dataset.delete) deleteStudent(Number(button.dataset.delete));
});

$('courseSelect').addEventListener('change', toggleCourseOther);
$('searchInput').addEventListener('input', renderStudents);
$('statusFilter').addEventListener('change', renderStudents);
$('sortSelect').addEventListener('change', renderStudents);
$('clearFilters').addEventListener('click', () => { $('searchInput').value = ''; $('statusFilter').value = 'All'; $('sortSelect').value = 'name'; renderStudents(); });

$('studentForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (state.saving) return;
  $('course').value = selectedCourse();
  const payload = Object.fromEntries(FIELDS.map((field) => [field, $(field).value]));
  const editing = state.editingId;
  state.saving = true; $('saveButton').disabled = true;
  try {
    await request(editing ? `/api/students/${editing}` : '/api/students', { method: editing ? 'PUT' : 'POST', body: JSON.stringify(payload) });
    closeModal();
    showToast(editing ? 'Student record updated.' : 'Student added to the directory.');
    await loadStudents();
  } catch (error) { $('formError').textContent = error.message; }
  finally { state.saving = false; $('saveButton').disabled = false; }
});

$('exportCsv').addEventListener('click', () => download(`students-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(state.students), 'text/csv'));
$('exportJson').addEventListener('click', () => download(`students-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify({ students: state.students }, null, 2), 'application/json'));
$('importJson').addEventListener('change', async (event) => { const [file] = event.target.files; if (file) await importStudents(file); event.target.value = ''; });

window.addEventListener('hashchange', showView);
showView();
loadStudents();
