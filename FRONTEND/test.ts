const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoicmFmZXlhYmR1bDcyNUBnbWFpbC5jb20iLCJpYXQiOjE3Njc4MTExMDMsImV4cCI6MTc2NzgxMjkwM30.uF3oUFAs9_f02qX98aH1qzqGEj2keBW3lw3KFnTIs7E';

Promise.all(
    Array.from({ length: 5 }, async () => {
        const res = await fetch(`http://192.168.18.149:3041/questions/python`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log(data.message || data[0].question);

    })
);

Promise.all(
    Array.from({ length: 5 }, async () => {
        const res = await fetch(`http://192.168.18.149:3041/questions/react`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json()
        console.log(data.message || data[0].question);
    })
);