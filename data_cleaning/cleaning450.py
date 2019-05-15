import pandas as pd

df = pd.read_csv('redfin.csv')

df['Median Sale Price'] = df['Median Sale Price'].str.replace(r"[a-zA-Z]",'')
df['Median Sale Price'] = df['Median Sale Price'].str.replace("$",'')
df['Median Sale Price'] = df['Median Sale Price'].str.replace(",",'')

df.to_csv(r'/Users/alimmomin/Downloads/export.csv')