https://monosnap.com/list/63559fa19b3d63bfdb433d26 - посилання на зображення виконання коду.

Модулі list та add - відпрацьовують коректно при виклиці команди node index.js --action="list" та node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22" відповідно

Модулі get та remove - не спрацьовують при виклиці команди з терміналу node index.js --action="get" --id=5
Але все працює, якщо викликати функцію із заданим іd в index-файлі: invokeAction({ action: "get", id: "3" }); та в терміналі викликати "npm start"
