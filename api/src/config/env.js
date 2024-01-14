const ENVSchema = {
    type : 'object',
    required : ['PORT'],
    properties : {
        PORT : { type : 'string', default : 3006 },
        
        DB_URL : { type : 'string' ,default : 'mongodb+srv://admin:admin@cluster0.khuyaej.mongodb.net/HBS?retryWrites=true&w=majority'
        }
    }
}

export const options = {
    confKey : 'config',
    schema : ENVSchema,
    dotenv : true
}
export const envConfig = {
    jwtkey:"eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwMDgwMzIyNCwiaWF0IjoxNzAwODAzMjI0fQ.18pqIjwGX_USQwVKrhAFyrcoBVWOtJEXe7eyFVyL1Es",
    secretKey : '123456'
}