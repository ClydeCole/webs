安裝openpyxl  
`pip install openpyxl`

# 工作表
## 獲取工作表
```python

```
# 選擇工作表並獲取Cell的值
```python
from oopenpyxl import load_workbook

wb = load_workbook("excels/test.xlsx") # 載入excel 文檔
ws = wb.active # 選擇工作表

print(ws) # 輸出當前工作表
print(ws["A1"].value) # 輸出A1的值
```

# 修改某個Cell的值
```python
wb = load_workbook('excels/test.xlsx')
ws = wb.active

ws["A4"].value = "小灰" # 修改值
wb.save('excels/test.xlsx') # 保存excel
```

# 獲取所有的Sheets 名稱
```
wb = load_workbook('excels/test.xlsx')
ws = wb.active
print(wb.sheetnames)
```

# 切換工作表
```
wb = load_workbook('excels/test.xlsx')
ws = wb["Sheet2"]

print(wb.sheetnames)  
print(ws)
```

# as