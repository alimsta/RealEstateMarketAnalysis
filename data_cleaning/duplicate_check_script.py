import pandas as pd
data = pd.read_csv("crime_data_w_population_and_crime_rate.csv")
cleaned_data = data.drop_duplicates("county_name")
cleaned_data = cleaned_data.dropna()
cleaned_data.to_csv("crime_data_w_population_and_crime_rate.csv")