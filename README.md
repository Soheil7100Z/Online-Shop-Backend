# Online Shop Backend

A Express.js backend for serving product data and handling the cart of selected items.

## 🌐 Live URL

- [Backend on Render](https://online-shop-backend-56vp.onrender.com)

## 🔍 Features

- **Endpoints in route products**:
  - `GET /products`: Fetch all products
  - `GET /products/:id`: Fetch individual item
- **Endpoints in route cart**:
  - `POST /cart`: send the IDs of items of cart
  - `GET /updatedCart`: Fetch all items in cart
  - `DELETE /deleteCart`: remove the items from the cart
 
## 🛠️ Technologies Used

- **Node.js + Express**
- **CORS** – for cross-origin frontend communication
- **dotenv** – for environment configuration

## 📁 Data Storage

- Product stored in JSON files
- All read/write handled through server-side file operations

## 🚀 Run Locally

```bash
git clone https://github.com/Soheil7100Z/Online-Shop-Backend.git
cd Online-Shop-Backend
npm install
node server.js
