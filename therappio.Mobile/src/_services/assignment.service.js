import axios from 'axios';

export const assignmentService = {
  getAll,
  create,
  update,
  delete: deleteAssignment,
};

function getAll() {
  return axios.get(`${global.apiUrl}/assignments`).then(res => res.data);
}

function create(assignment) {
  return axios.post(`${global.apiUrl}/assignments`, assignment).then(res => {
    return res.data;
  });
}

function update(assignment) {
  return axios.put(`${global.apiUrl}/assignments/${assignment._id}`, assignment).then(res => {
    return res.data;
  });
}

function deleteAssignment(id) {
  return axios.delete(`${global.apiUrl}/assignments/${id}`).then(res => {
    return res.data;
  });
}
