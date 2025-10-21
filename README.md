# Inventory Management System (React + RTK Query) 📦

## 🎯 Overview

This project is a simple, role-based inventory management system designed to demonstrate robust state management and efficient data fetching using **React**, **Redux Toolkit (RTK)**, and **Redux Toolkit Query (RTK Query)**.

The application features two main user roles with restricted access and automatic data synchronization.

## ✨ Key Features

* **Role-Based Access Control (RBAC):** Users are restricted and redirected based on their role (`manager` or `customer`) using React Router guards.
* **RTK Query Caching:** Updates by the manager automatically trigger a re-fetch of product data for the customer's view via the `providesTags` and `invalidatesTags` mechanism, ensuring data consistency without manual refetching.
* **Mock Backend:** Uses **JSON Server** to simulate a full REST API (`GET`, `PUT`, `PATCH`) for a smooth development experience.

---

## 🛠️ Tech Stack

* **React**
* **Redux Toolkit (RTK)**
* **RTK Query**
* **React Router v6**
* **JSON Server** (for mock API)

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

Navigate to the project root and install the dependencies:

npm install



Install the mock API server globally:

npm install -g json-server





🔑Application Credentials (Mock Data)

Use these credentials for testing access control:
Role	       Username	  Password	
Manager	     admin	    123	       
Customer	   john	      456	        



📂 Project Structure

src/<br>
├── app/<br>                  
│   ├── store.js<br>          
│   └── api/<br>
│       └── apiSlice.js <br>  
│
├── components/    <br>       
│   └── RoleBasedRoute.js <br>
│
├── features/ <br>            
│   ├── auth/  <br>           
│   ├── manager/     <br>     
│   └── customer/     <br>    
└── App.js                # Main router setup<br>
