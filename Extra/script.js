// Lấy các phần tử DOM
const fullNameInput = document.getElementById('fullName');
const classNameInput = document.getElementById('className');
const errorFullName = document.getElementById('errorFullName');
const errorClassName = document.getElementById('errorClassName');
const btnAdd = document.getElementById('btnAdd');
const btnUpdate = document.getElementById('btnUpdate');
const btnCancel = document.getElementById('btnCancel');
const notification = document.getElementById('notification');
const studentForm = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

let students = []; // Mảng lưu trữ danh sách học sinh
let editId = null;

// Hàm hiển thị thông báo
function showNotification(message, isSuccess = true) {
    notification.textContent = message;
    notification.className = isSuccess ? 'notification success' : 'notification error';
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// Hàm render danh sách học sinh
function renderStudents() {
    studentTable.innerHTML = ''; // Xóa nội dung cũ
    
    students.forEach(student => {
        const row = studentTable.insertRow();
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.fullName}</td>
            <td>${student.className}</td>
            <td>
                <button class="btn-edit" data-id="${student.id}">Sửa</button>
                <button class="btn-delete" data-id="${student.id}">Xóa</button>
            </td>
        `;
    });
    
    // Gắn lại sự kiện cho các nút Sửa/Xóa mới
    attachEditDeleteEvents();
}

// Hàm gắn sự kiện cho các nút Sửa/Xóa
function attachEditDeleteEvents() {
    // Sự kiện nút Sửa
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const student = students.find(s => s.id == id);
            
            if (student) {
                editId = student.id;
                fullNameInput.value = student.fullName;
                classNameInput.value = student.className;
                
                btnAdd.style.display = 'none';
                btnUpdate.style.display = 'inline-block';
                btnCancel.style.display = 'inline-block';
            }
        });
    });
    
    // Sự kiện nút Xóa
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            
            if (window.confirm('Bạn có chắc muốn xóa Học sinh này?')) {
                students = students.filter(s => s.id != id);
                renderStudents();
                showNotification('Xóa thành công!');
            }
        });
    });
}

// Hàm validate form
function validateForm() {
    let isValid = true;
    const fullName = fullNameInput.value.trim();
    const className = classNameInput.value.trim();

    if (fullName === '') {
        errorFullName.textContent = 'Họ tên không được để trống';
        errorFullName.style.display = 'block';
        isValid = false;
    } else if (fullName.length > 50) {
        errorFullName.textContent = 'Họ tên không quá 50 ký tự';
        errorFullName.style.display = 'block';
        isValid = false;
    } else {
        errorFullName.style.display = 'none';
    }

    if (className === '') {
        errorClassName.textContent = 'Lớp không được để trống';
        errorClassName.style.display = 'block';
        isValid = false;
    } else {
        errorClassName.style.display = 'none';
    }

    return isValid;
}

// Sự kiện nút Thêm
btnAdd.addEventListener('click', () => {
    if (validateForm()) {
        const newStudent = {
            id: Date.now().toString(),
            fullName: fullNameInput.value.trim(),
            className: classNameInput.value.trim()
        };
        
        students.push(newStudent);
        renderStudents();
        showNotification('Thêm Học sinh thành công!');
        studentForm.reset();
    }
});

// Sự kiện nút Cập nhật
btnUpdate.addEventListener('click', () => {
    if (validateForm() && editId) {
        const studentIndex = students.findIndex(s => s.id == editId);
        
        if (studentIndex !== -1) {
            students[studentIndex] = {
                id: editId,
                fullName: fullNameInput.value.trim(),
                className: classNameInput.value.trim()
            };
            
            renderStudents();
            showNotification('Cập nhật thành công!');
            studentForm.reset();
            btnAdd.style.display = 'inline-block';
            btnUpdate.style.display = 'none';
            btnCancel.style.display = 'none';
            editId = null;
        }
    }
});

// Sự kiện nút Hủy
btnCancel.addEventListener('click', () => {
    studentForm.reset();
    btnAdd.style.display = 'inline-block';
    btnUpdate.style.display = 'none';
    btnCancel.style.display = 'none';
    editId = null;
    errorFullName.style.display = 'none';
    errorClassName.style.display = 'none';
});

// Khởi tạo dữ liệu mẫu
students = [
    { id: '1', fullName: 'Nguyễn Văn A', className: '10A1' },
    { id: '2', fullName: 'Trần Thị B', className: '10A2' }
];

// Render danh sách ban đầu
renderStudents();