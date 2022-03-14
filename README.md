# Dango Shop

Dango Shop is a store selling accessories and gifts.\
Conditions: npm, nodejs, yarn

## Backend

Step 1:

```bash
cd backend/
yarn
```

Step 2:

```bash
linux: touch .env
or
windows: type nul > .env
```

Step 3: Fill in the fields to the file .env

```bash
API_URL = /api/v1
CONNECTION_STRING = ...
SECRET_KEY = ...
```

Step 4:

```bash
yarn run start
```

## Frontend

Step 1:

```bash
cd frontend/
yarn
yarn global add @angular/cli 
yarn global add nx 
```

Step 2:

```bash
admin: nx serve admin
or
admin: nx serve
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
