# Lorena Fotografija

Web stranica fotografkinje Lorena, izrađena po uzoru na [phototales.hr](https://phototales.hr/).

## Struktura

```
index.html        glavna stranica (sve sekcije)
css/style.css      stilovi
js/main.js         mobilni izbornik, smooth scroll, placeholderi za fotografije
images/            ovdje idu vaše fotografije
```

## Dodavanje vlastitih fotografija

Stranica trenutačno prikazuje isprekidane placeholder okvire umjesto fotografija —
to je normalno dok ne dodate svoje slike. Samo ubacite datoteke u `images/` folder
pod točno ovim imenima i placeholderi će automatski nestati:

| Datoteka | Gdje se koristi | Preporučena veličina |
|---|---|---|
| `images/hero.jpg` | Naslovna fotografija (vrh stranice) | 1920×1080px ili veće |
| `images/usluga-novorodencad.jpg` | Kartica "Novorođenčad" | 1000×1250px |
| `images/usluga-obitelj.jpg` | Kartica "Obitelj" | 1000×1250px |
| `images/usluga-trudnice.jpg` | Kartica "Trudnoća" | 1000×1250px |
| `images/lorena-portret.jpg` | Portret u sekciji "O meni" | 900×1100px |
| `images/galerija-01.jpg` … `images/galerija-08.jpg` | Galerija (8 fotografija) | kvadratne, min. 800×800px |

## Uređivanje teksta

Sav tekst (usluge, opis, recenzije, kontakt podaci, cijena poklon bona itd.) nalazi se
izravno u `index.html` i može se mijenjati po želji — trenutni tekstovi su primjer.

## Pregled prije objave

Otvorite `index.html` izravno u pregledniku, ili pokrenite lokalni server iz ovog foldera, npr.:

```
python3 -m http.server
```

pa otvorite `http://localhost:8000`.
