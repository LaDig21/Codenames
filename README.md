# CODENAMES

## Back end
Python server using Flask and SQL Alchemy

How to install it (Python v3.8 / Windows):

1. Create and activate virtual environnement:
```bash
$ python -m venv /path/to/new/virtual/environment
$ /path/to/new/virtual/environment/Scripts/activate.bat
```



2. Install dependencies:
```bash
$ pip install -r requirements.txt
```

3. Create DB with your own words (optionnal, site.db is already created):
 * Delete site.db
 * Input word list in data/word.py
 * Run create_db.py
```bash
python create_db.py
```

4. Run the app
```bash
$ python run.py
```


## Front end
React app

see README file in front folder