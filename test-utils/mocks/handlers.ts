import { rest } from 'msw';

const CONTACT_API = 'https://api.backbonechallenge.app';

export const handlers = [
  rest.get(`http://localhost/undefined/contacts`, (req, res, ctx) => {
    const perPage = req.url.searchParams.get('perPage');
    const page = req.url.searchParams.get('page');

    return res(
      ctx.json(
        {
          "count": 1515,
          "perPage": 10,
          "currentPage": 1,
          "totalPages": 152,
          "results": [
            {
              "_id": "63b813a66142557b9b5d2311",
              "firstName": "Edythe",
              "lastName": "Gerhold",
              "email": "JAMISON43@YAHOO.COM",
              "phone": "433",
              "createdAt": "2023-01-06T12:27:18.960Z",
              "updatedAt": "2023-01-06T12:27:18.960Z",
              "__v": 0,
              "id": "63b813a66142557b9b5d2311"
            },
            {
              "_id": "63b73e8b2c3946770b3926d4",
              "firstName": "Lady",
              "lastName": "Gaga",
              "phone": "1237867895",
              "email": "lady@gaga.com",
              "createdAt": "2023-01-05T21:18:03.790Z",
              "updatedAt": "2023-01-05T21:18:03.790Z",
              "__v": 0,
              "id": "63b73e8b2c3946770b3926d4"
            },
            {
              "_id": "63b73e3e2c3946770b3926d3",
              "firstName": "Mark",
              "lastName": "Twain",
              "phone": "1123442211",
              "email": "mark@twain.com",
              "createdAt": "2023-01-05T21:16:46.334Z",
              "updatedAt": "2023-01-05T21:16:46.334Z",
              "__v": 0,
              "id": "63b73e3e2c3946770b3926d3"
            },
            {
              "_id": "63b734492c3946770b3926d2",
              "firstName": "John",
              "lastName": "Doe",
              "phone": "1554111333",
              "email": "john@doe.com",
              "createdAt": "2023-01-05T20:34:17.911Z",
              "updatedAt": "2023-01-05T20:34:17.911Z",
              "__v": 0,
              "id": "63b734492c3946770b3926d2"
            },
            {
              "_id": "639de94d90e725ed7e095557",
              "firstName": "Alfredo",
              "lastName": "Herrera Ventura",
              "email": "ing.alfredoherrera@hotmaill.com",
              "phone": "7712073670",
              "createdAt": "2022-12-17T16:07:41.693Z",
              "updatedAt": "2022-12-17T16:07:41.693Z",
              "__v": 0,
              "id": "639de94d90e725ed7e095557"
            },
            {
              "_id": "639d42f990e725ed7e095556",
              "firstName": "Alfredo",
              "lastName": "Herrera Ventura",
              "email": "ing.alfredoherrera@hotmail.comm",
              "phone": "7712073675",
              "createdAt": "2022-12-17T04:18:01.800Z",
              "updatedAt": "2022-12-17T04:18:01.800Z",
              "__v": 0,
              "id": "639d42f990e725ed7e095556"
            },
            {
              "_id": "639d195790e725ed7e095555",
              "firstName": "Paulina",
              "lastName": "Montesinos ",
              "email": "pau@gmail.com",
              "phone": "7712073671",
              "createdAt": "2022-12-17T01:20:23.300Z",
              "updatedAt": "2022-12-17T01:20:23.300Z",
              "__v": 0,
              "id": "639d195790e725ed7e095555"
            },
            {
              "_id": "639b7587f716c7bec36637e6",
              "firstName": "Alfredo",
              "lastName": "Herrera Ventura",
              "email": "ing.alfredoherreraaa@hotmail.com",
              "phone": "7712073676",
              "createdAt": "2022-12-15T19:29:11.407Z",
              "updatedAt": "2022-12-15T19:29:11.407Z",
              "__v": 0,
              "id": "639b7587f716c7bec36637e6"
            },
            {
              "_id": "639b7449f716c7bec36637e5",
              "firstName": "Alfredo",
              "lastName": "Herrera Ventura",
              "email": "ing.alfredoherrera@hotmail.com",
              "phone": "7712073672",
              "createdAt": "2022-12-15T19:23:53.350Z",
              "updatedAt": "2022-12-15T19:23:53.350Z",
              "__v": 0,
              "id": "639b7449f716c7bec36637e5"
            },
            {
              "_id": "639b4833f716c7bec36637e4",
              "firstName": "tgtg",
              "lastName": "Mertz",
              "email": "emer@mail.com",
              "phone": "3423423434",
              "createdAt": "2022-12-15T16:15:47.256Z",
              "updatedAt": "2022-12-15T16:15:47.256Z",
              "__v": 0,
              "id": "639b4833f716c7bec36637e4"
            }
          ]
        }
      )
    );
  }),];