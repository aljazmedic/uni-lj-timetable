# Urnik za univerzo v Ljubljani
---
Package za npm, ki preverja spremembe in pridobiva urnike za programe fakultet v Ljubljani. Dela na podlagi web-scrapanja.


### Windows uporaba
---
pred zagonom je potrebno nastaviti privzeto lupino:
`npm config set script-shell bash.exe`

vse logiranje se na koncu stisne s pomočjo `gzip`a, zato je potrebna namestitev omenjenega programa

### Zagon

za zagon je potrebno namestiti pakete npm, z ukazon `npm install`, nato pa zgraditi in zagnati strežnik, z
ukazoma `npm run build` in `npm start`
