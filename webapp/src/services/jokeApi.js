import axios from 'axios'

const baseUrl = "http://localhost:3001/api/jokes"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOneById = (id) => {
  const request = axios.get(baseUrl + '/' + id)
  return request.then(response => response.data)
}

const createOne = (newSerie) => {
  const request = axios.post(baseUrl, newSerie)
  return request.then(response => response.data)
}

const removeOneById = (id) => {
    const request = axios.delete(baseUrl + '/' + id)
    return request.then(response => response.data)
}

export default { 
  getAll: getAll,
  getOneById: getOneById,
  createOne: createOne,
  removeOneById: removeOneById
}