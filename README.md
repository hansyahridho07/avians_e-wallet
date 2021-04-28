# aviana_e-wallet

## Link deploy: https://aviana-e-wallet.web.app/

**Akun Percobaan**

- **Username: user1**
- **Password: 12345**

---

## API DOC

- **POST /user/createUser**

  _Request Header_

  ```
  no needed
  ```

  _Request Body_

  ```js
  name: user1;
  username: user1;
  passwrod: 12345;
  ```

  _Response_

  **_Success_**

  - **(201) - CREATED**

    ```js
    {
      name: "user1",
      username: "user1",
      saldo: 0
    }
    ```

  **_Error_**

  - **(400) - Bad Request**

    ```js
    {
      message: [
        "Name canot be empty",
        "Name is must",
        "Username already exist",
        "Username is must",
        "Username canot be empty",
        "Password canot be empty",
        "Password is must",
        "Password minimal 5 character",
      ];
    }
    ```

    OR

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal Server Error";
    }
    ```

---

- **POST /user/loginUser**

  _Request Header_

  ```
  no needed
  ```

  _Request Body_

  ```js
  username: user1;
  passwrod: 12345;
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
      access_token;
    }
    ```

  **_Error_**

  - **(400) - Unauthorized**

    ```js
    {
      message: "Invalid username/password";
    }
    ```

    OR

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal Server Error";
    }
    ```

---

- **GET /user/**

  _Request Header_

  ```js
  access_token;
  ```

  _Request Body_

  ```js
  no needed
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
      name: "user1",
      username: "user1",
      saldo: 0
    }
    ```

  **_Error_**

  - **(400) - Bad Request**

    ```js
    {
      message: "Invalid Token";
    }
    ```

    OR

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal Server Error";
    }
    ```

---

- **GET /user/voucher**
  _Request Header_

  ```js
  access_token;
  ```

  _Request Body_

  ```js
  no needed
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
      vouchers: [
        {
          name_voucher: "5000",
          price: 5000,
        },
        {
          name_voucher: "10000",
          price: 10000,
        },
      ];
    }
    ```

  **_Error_**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal Server Error";
    }
    ```

---

- **GET /user/transactionBuy**

  _Request Header_

  ```js
  access_token;
  ```

  _Request Body_

  ```js
  no needed
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
      snapToken;
    }
    ```

  **_Error_**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal Server Error";
    }
    ```

---

- **GET /user/transaction**

  _Request Header_

  ```js
  access_token;
  ```

  _Request Body_

  ```js
  no needed
  ```

  _Response_

  **_Success_**

  - **(200) - OK**
    ```js
    {
      transactions: [
        {
          VoucherId: 1,
          UserId: 1,
        },
        {
          VoucherId: 2,
          UserId: 1,
        },
      ];
    }
    ```

  **_Error_**

  - **(500) - Internal Server Error**
    ```js
    {
      message: "Internal Server Error";
    }
    ```

---
