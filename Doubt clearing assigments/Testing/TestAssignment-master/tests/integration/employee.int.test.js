
const request = require('supertest');
const app = require('../../app');
const endPointUrl = "/employees/employee";
var raw_data = {}

describe("Integartion Test",()=>{
    test("testing Url",async ()=>{
        const raw_data = {name:"test",designation:"test",salary:100};
        const response = await request(app).post(endPointUrl).send(raw_data);
        expect(response.statusCode).toBe(201);
    })
    test("GET all Test",async ()=>{
        const response = await request(app).get('/employees/employees');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].name).toBeDefined();
        expect(response.body[0].salary).toBeDefined();
        expect(response.body[0].designation).toBeDefined();
        raw_data = response.body[0];
    });

    test("Test GET by ID",async()=>{
        let id = raw_data._id;
        const response = await request(app).get(endPointUrl+"/"+id);
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(raw_data);
    })

    test("Test update by ID",async()=>{
        let id = raw_data._id;
        let updated_data = {name:"test1",designation:"test1",salary:100};
        const response = await request(app).put(endPointUrl+"/"+id).send(updated_data);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toStrictEqual(updated_data.name);
        expect(response.body.salary).toStrictEqual(updated_data.salary);
    })

    test("Test delete by ID",async()=>{
        let id = raw_data._id;
        const response = await request(app).put(endPointUrl+"/"+id);
        expect(response.statusCode).toBe(200);
    })
})

