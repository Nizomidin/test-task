import requests
accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzNjgzNzk2LCJpYXQiOjE2OTM2ODAxOTYsImp0aSI6IjcxYzViMDdhZTA2ZTQ3MDhiZWYyZjU5MmQ4YjcwN2NiIiwidXNlcl9pZCI6MX0.ivDOGd7cy6OzGWkjfS9K33JWUvIk9rjljhpjAZFO_VY'
headers = {
    'Authorization': f'Bearer {accessToken}'
}

res = requests.get('http://31.129.97.20/api/v1/handbook/products/', headers=headers)
print(res.json())