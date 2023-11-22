import People from '@/models/People'

export default interface PeoplesResponse {
  count: number;
  next: string|null;
  previous: string|null;
  results: People[];
}