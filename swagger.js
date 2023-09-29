const m2s = require('mongoose-to-swagger')
const User = require("./models/user.model")
const Product = require('./models/product.model')

exports.options = {
  "components" : {
    "schemas" : {
      User: m2s(User), // 'mngoose-to-swagger' takes as an argument the User schema
      Product: m2s(Product)
    }
  },
  "openapi" : "3.1.0",
  "info" : {
    "version" : "1.0.0",
    "title" : "Products CRUD API",
    "description" : "Products Project Application"
  },
  "contact" : {
      "name" : "API Support",
      "url" : "http://www.example.com",
      "email" : "support@example.com"
  },
  "servers" : [
    {
      url: "http://localhost:3000",
      description : "Local Server"
    },
    {
      url: "http://www.example.com",
      description: "Testing Server"
    }
  ],
  "tags": [
    {
      "name" : "Users",
      "description" : "API for users"
    }, {
      "name": "Products",
      "description" : "API for products"
    },
    {
      "name" : "Users and Products",
      "description" : "API for users and products"
    }
  ],
  "paths" : {
    "/api/users" : {
      "get" : {
        "tags" : [
          "Users"
        ],
        "summary" : "Get All Users",
        "responses" : {
          "200" : {
            "description" : "A list of users",
            "content" : {
              "application/json" : {
                "schema" : {
                  "type" : "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          },
        }
      },
      "post" : {
        "tags" : [
          "Users"
        ],
        "description" : "Create new user",
        "requestBody" : {
          "description" : "User that we want to create",
          "content" : {
            //"application/x-www-form-urlencoded" : {
            "application/json" : {
              "schema" : {
                "type" : "object",
                "properties" : {
                  "username" : { "type" : "string" },
                  "password" : { "type" : "string" },
                  "name" : { "type" : "string" },
                  "surname" : { "type" : "string" },
                  "email" : { "type" : "string" },
                  "address" : { "type" : "object" ,
                                "properties" : { 
                                  "area" : { "type" : "string"},
                                  "road" : { "type" : "string"}}},
                  "phone" : {
                    "type" : "array",
                    "items" : {
                      "type" : "object",
                      "properties" : { 
                        "type" : { "type" : "string" },
                        "number" : { "type" : "string" }
                      }
                    }
                  }
                },
                "required" : [ "username", "password" , "email"]
              }
            }
          }
        },
        "responses" : {
          "200" : {
            "description" : "New user is created"
          }
        }
      }
    
    },
    // "/api/user-products" : {
    //   "get" : {
    //     "tags" : [
    //       "Users and Products"
    //     ],
    //     "summary" : "Get all User's products",
    //     "response": {
    //       "200" : {
    //         "description" : "OK",
    //         "schema" : {
    //           "$ref": "#/components/schemas/Product"
    //         }
    //       }
    //     } 
    //   }
    // },
    "/api/users/{username}" : {
      "get" : {
        "tags" : [
          "Users"
        ],
        "parameters" : [
          {
            "name" : "username",
            "in" : "path",
            "required" : true,
            "description" : "Username of user that we want to find",
            "type" : "string"
          }
        ],
        "summary" : "Get user with specific username",
        "responses" : {
          "200" : {
            "description" : "User Found",
            "schema" : {
              "$ref" : "#/components/schemas/User"
            }
          }
        }
      },
      "patch" : {
        "tags" : [
          "Users"
        ],
        "description" : "Update user",
        "parameters" : [
          {
            "name" : "username",
            "in" : "path",
            "reduired" : true,
            "description" : "Username of user that we want to update",
            "type" : "string"
          }
        ],
        "requestBody" : {
          "description" : "Data of user that we want to update",
          "content" : {
            "application/json" : { 
              "schema" : {
                "type" : "object",
                "properties" : {
                  "username" : { "type" : "string" },
                  "name" : { "type" : "string"},
                  "surname" : { "type" : "string" },
                  "email" : { "type" : "string" },
                  "address" : { 
                    "type" : "object",
                    "properties" : {
                      "area" : { "type" : "string" },
                      "road" : { "type" : "string" }
                    },
                    "phone" : {
                      "type" : "array", 
                      "items" : {
                        "type" : "object",
                        "properties" : {
                          "type" : { "type" : "string" },
                          "number" : { "type" : "string" }
                        }
                      }
                    }
                  }
                },
                "required" : ["email"]
              }
            }
          }
        },
        "responses" : {
          "200" : {
            "description" : "User updated",
            "schema" : {
              "$ref" : "#/components/schemas/User"
            }
          }
        }
      },
      "delete" : {
        "tags" : [
          "Users"
        ],
        "description" : "Deletes a user",
        "parameters" : [
          {
            "name" : "username",
            "in" : "path",
            "description" : "Username of user we want to delete",
            "schema" : {
              "$ref" : "#/components/schemas/User"
            }
          }
        ],
        "responses" : {
          "200" : {
            "description" : "User successfully deleted"
          }
        }
      }
    },
    "/api/users-products" : {
      "get" : {
        "tags" : [
          "Users and Products"
        ],
        "summary" : "Get all user's product",
        "description" :"All user's products",
        "responses" : {
          "200" : {
            "description" : "OK",
            "schema" : {
              "$ref" : "#/components/schemas/User"
            }
          }
        }
      },
      "post" : {
        "tags" : [
          "Users and Products"
        ],
        "description" : "Add new product for user",
        "requestBody" : {
          "description" : "User that we want to add product",
          "content" : {
            "application/json" : {
              "schema" : {
                "type" : "object" ,
                "properties" : {
                  "username" : { "type" : "string" },
                  "products" : { 
                    "type" : "array",
                    "items" : "objects",
                    "properties" : {
                      "product" : { "type" : "string" },
                      "post" : { "type" : "number" },
                      "quantity" : { "type" : "number" }
                    }}
                },
                "required" : [ "quantity" ]
              }
            }
          }
        },
        "responses" : {
          "200" : {
            "description" : "New product added"
          }
        }
      }
    },
    "/api/users-products/{username}" : {
      "get" : {
        "tags" : [
          "Users and Products"
        ],
        "parameters" : [
          {
            "name" : "username",
            "in" : "path",
            "required" : true,
            "description" : "User's username to find products",
            "type" : "string"
          }
        ],
        "description" : "Description Text",
        "summary" : "Summary Text",
        "responses" : {
          "200" : {
            "description" : "User's products",
            "schema" : {
              "$ref" : "#/components/schemas/user"
            }
          }
        }
      },
      "patch" : {
        "tags" : [
          "Users and Products"
        ],
        "parameters" : [
          {
            "name" : "username",
            "in" : "path",
            "required" : true,
            "description" : "User's username to find products",
            "type" : "string"
          }
        ],
        "description" : "Update uer's product",
        "requestBody" : {
          "description" : "Description for requestbody" ,
          "content" : {
            "application/json" : {
              "schema" : {
                "type" : "object",
                "properties" : {
                  "username" : {"type" : "string"},
                  "product" : {
                    "type" : "object",
                    "properties" : {
                      "_id" : {"type" : "string"},
                      "quantity" : {"type" : "number"}
                    }
                  }
                },
                "required" : ["quantity"]
              }
            }
          }
        }
      },
      "responses" : {
        "200" : {
          "description" : "description for response"
        }
      }
    },
    "/api/users-products/{username}/products/{product}" : {
      "delete" : {
        "tags" : [
          "Users and products"
        ],
        "description" : "Description for delete",
        "parameters" : [
          {
            "name" : "username",
            "in" : "path",
            "description" : "username to find",
            "required" : true
          },
          {
            "name" : "product",
            "in" : "path",
            "description" : "product name to delete",
            "required" : true
          }
        ],
        "responses" : {
          "200" : {
            "description" : "product deleted"
          }
        }
      }
    }
  }

}