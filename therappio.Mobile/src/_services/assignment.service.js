import axios from 'axios';

export const assignmentService = {
  getAll,
  create,
  update,
  delete: deleteAssignment,
};

function getAll() {
  return axios.get(`${config.apiUrl}/assignments`).then(res => res.data);
}

function create(assignment) {
  return axios.post(`${config.apiUrl}/assignments`, assignment).then(res => {
    return res.data;
  });
}

function update(assignment) {
  return axios.put(`${config.apiUrl}/assignments/${assignment._id}`, assignment).then(res => {
    return res.data;
  });
}

function deleteAssignment(id) {
  return axios.delete(`${config.apiUrl}/assignments/${id}`).then(res => {
    return res.data;
  });
}
