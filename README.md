# Coat King

Landing stranica za salon za njegu pasa Coat King (Samobor), izrađena po uzoru na Instagram profil [@coatking.hr](https://www.instagram.com/coatking.hr/).

## Struktura

```
index.html         glavna stranica (sve sekcije, stilovi i skripta su unutar jedne datoteke)
images/             logo (ck-full.jpg, ck-icon.jpg) i fotografije za galeriju (gallery-1.jpg … gallery-9.jpg)
```

## Logo i ilustracije

Logo se nalazi u `images/ck-full.jpg` (puni logotip s natpisom) i `images/ck-icon.jpg` (samo ikona, korištena u zaglavlju, footeru i "O nama" sekciji). Ilustracije pasmina u sekciji "Dvorski štićenici" ručno su nacrtane (SVG kod izravno u `index.html`) u stilu loga.

## Galerija fotografija

Sekcija "Dvorski trenuci" prikazuje 9 stvarnih fotografija iz salona (`images/gallery-1.jpg` … `images/gallery-9.jpg`), poredanih redoslijedom po kojem ste numerirali izvorne slike (0, 1, 2, 3, 4, 5, 7, 8, 9). Za zamjenu ili dodavanje fotografija, ubacite novu sliku u `images/` folder i izmijenite odgovarajući `<img src="...">` unutar `<div class="photo-grid">` u `index.html` (potražite `id="foto-galerija"`). Dvije slike su označene klasom `tall` radi izmjeničnog rasporeda — po želji tu klasu možete maknuti ili dodati drugoj slici.

## Uređivanje teksta

Sav tekst (usluge, opis, kontakt podaci, adresa, telefon, radno vrijeme itd.) nalazi se izravno u `index.html` i može se mijenjati po želji — trenutni tekstovi su spremni za objavu, ne radi se o placeholderima.

## Pregled prije objave

Otvorite `index.html` izravno u pregledniku, ili pokrenite lokalni server iz ovog foldera, npr.:

```
python3 -m http.server
```

pa otvorite `http://localhost:8000`.

## Objava na webu (opcionalno)

Stranica je statična (samo HTML + slike), pa je možete hostati bilo gdje — npr. na GitHub Pagesu, kao i LorenaPhotos. Za vlastitu domenu dodajte `CNAME` datoteku s nazivom domene (npr. `www.coatking.hr`) u ovaj folder.
