# API

## Cubic Root

### **POST** - /api/cubic_root

#### Description
Calculates the cubic root of a number.

Example API call:

### Request

```
POST /api/cubic_root

{
   firstValue: 9
}

```

### Response

```
{
  "id": 13,
  "expression": "\u221b9",
  "result": 2.080083823051904,
  "createdAt": "2019-01-27 10:03:39"
}
```


## Square Root

### **POST** - /api/square_root

#### Description
Calculates the square root of a number.

Example API call:

### Request

```
POST /api/square_root

{
   firstValue: 9
}

```

### Response

```
{
  "id": 14,
  "expression": "\u221a9",
  "result": 3,
  "createdAt": "2019-01-27 10:04:57"
}
```

## Factorial

### **POST** - /api/factorial

#### Description
Calculates the factorial of a number.

Example API call:

### Request

```
POST /api/factorial

{
   firstValue: 3
}

```

### Response

```
{
  "id": 15,
  "expression": "3!",
  "result": 6,
  "createdAt": "2019-01-27 10:05:44"
}
```

## Percentage

### **POST** - /api/percentage

#### Description
Calculates the percentage of a number.

Example API call:

### Request

```
POST /api/percentage

{
   firstValue: 10
}

```

### Response

```
{
  "id": 16,
  "expression": "10%",
  "result": 0.1,
  "createdAt": "2019-01-27 10:06:13"
}
```


## Division

### **POST** - /api/division

#### Description
Calculates the division of two numbers.

Example API call:

### Request

```
POST /api/division

{
   firstValue: 4,
   secondValue: 2
}

```

### Response

```
{
  "id": 12,
  "expression": "4 / 2",
  "result": 2,
  "createdAt": "2019-01-27 10:00:30"
}
```

## Subtraction


### **POST** - /api/subtraction

#### Description
Calculates the subtraction of two numbers.

Example API call:

### Request

```
POST /api/subtraction

{
   firstValue: 4,
   secondValue: 2
}

```

### Response

```
{
  "id": 12,
  "expression": "4 - 2",
  "result": 2,
  "createdAt": "2019-01-27 10:00:30"
}
```


## Addition


### **POST** - /api/addition

#### Description
Calculates the addition of two numbers.

Example API call:

### Request

```
POST /api/addition

{
   firstValue: 4,
   secondValue: 2
}

```

### Response

```
{
  "id": 12,
  "expression": "4 + 2",
  "result": 6,
  "createdAt": "2019-01-27 10:00:30"
}
```

## Power

### **POST** - /api/power

#### Description
Calculates the power of two numbers.

Example API call:

### Request

```
POST /api/power

{
   firstValue: 4,
   secondValue: 2
}

```

### Response

```
{
  "id": 12,
  "expression": "4 ^ 2",
  "result": 16,
  "createdAt": "2019-01-27 10:00:30"
}
```

## Multiplication

### **POST** - /api/multiplication

#### Description
Calculates the multiplication of two numbers.

Example API call:

### Request

```
POST /api/multiplication

{
   firstValue: 4,
   secondValue: 2
}

```

### Response

```
{
  "id": 12,
  "expression": "4 x 2",
  "result": 8,
  "createdAt": "2019-01-27 10:00:30"
}


