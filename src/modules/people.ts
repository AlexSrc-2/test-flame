import axios from 'axios'
import store from '@/store'
import PeoplesResponse from '@/models/PeoplesResponse'
import People from '@/models/People'

const apiUrl = 'https://swapi.dev/api'

export function listPeoples(page: number|null): Promise<void> {
    return axios.get(`${apiUrl}/people?page=${page ?? 1}`)
        .then(({ data }) => {
            store.dispatch('setPeoples', data.results)
            store.dispatch('setCountPeoples', data.count)
            store.dispatch('setHasNext', data.next !== null)
            store.dispatch('setHasPrev', data.previous !== null)
        })
}

export function searchPeoples(text: string): Promise<PeoplesResponse> {
    return axios.get(`${apiUrl}/people/?search=${text}`)
        .then(({ data }) => {
            return data
        })
}

export function readInvoice(id: string|number): Promise<People> {
    return axios.get(`${apiUrl}/people/${id}`)
        .then(({ data }) => {
            return data
        })
}