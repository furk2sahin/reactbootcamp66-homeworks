# 2.Hafta Ödevi

## Film Listesi

# Çıktı:
![](film-listesi-odevi-furk2sahin/outputs/output.gif)

Component kavramını daha iyi anlayabilmek için bir film listesi yapabilirsiniz.
Listeleme işlemi için gerekli veri projeye eklendi(movies.js).

```js
App.js

import movies from './movies';
```


### Veri Önizlenimi

```js
 {
    id: 1,
    title: 'Pursuit of Happyness, The',
    description: 'Drama',
  },
  {
    id: 2,
    title: "Alabama Moon",
    description: "Adventure|Children|Drama"
  },
```

**Not:** Veriler [https://www.mockaroo.com](https://www.mockaroo.com) yardımıyla üretilmiştir.


# 3.Hafta Ödevi

## Tic Tac Toe Oyunu

# Çıktı:
![](tic-tac-toe-oyunu-furk2sahin/outputs/output.gif)

2 kişinin oynayabileceği bir Tic Tac Toe oyunu yapmanızı bekliyoruz. Tasarımı size kalmakla birlikte referans olması açısından bir görsel ekledik.

### Oyun Akışı
- Kullanıcı hamlelerinden birisi "X" ile ifade edilirken, diğeri "O" ile ifade edilecek.
- Tıklama aksiyonunda sıralamaya göre "X" veya "O" ekleme işlemi yapılacak.
- Dikey, yatay veya çapraz olarak aynı tipteki ikonları sıralayabilen oyuncu oyunu kazanır.
- Kazanma, kaybetme ve beraberlik durumlarında sonuç ekranda gösterilecek. 

Detaylı oyun kuralları için [tıklayabilirsiniz](https://www.exploratorium.edu/brain_explorer/tictactoe.html). 

![tic-tac-toe-reference-image](tic-tac-toe-oyunu-furk2sahin/image/tic-tac-toe-reference.jpg)

## Kurulum

Projeyi lokalde çalıştırabilmek için: 

* Repo'yu klonlayın `git clone https://github.com/ReactBootcamp66/tic-tac-toe-odevi.git`
* Komutu çalıştırın `cd tic-tac-toe`
* Komutu çalıştırın `npm install` veya `yarn install`
* Komutu çalıştırın `npm start` veya `yarn install` 

# 4.Hafta Ödevi

## Mcking Burger

# Çıktı:
![](mcking-burger-online-furk2sahin/public/output.gif)

Bu ödevde online hamburger siparişi verebileceğimiz bir sistem yapacağız.

## Giriş

Mcking Burger adında bir şirketimiz var ve buradan müşterilerimizin online hamburger verebilmesini istiyoruz.

Not: Ödevde ihtiyaç duyduğunuz bilgileri `alt tarafta` ekledik.

- Hamburger tasarımı için gerekli olan css kodları
- Sizden beklediğimiz sonucun ekran görüntüleri

## İstenilenler

- 2 sayfadan oluşmalıdır.
  -- Anasayfa: Hamburgeri oluşturma işlemini yapıp ve siparişi tamamla diyebilmelidir.
  -- Sonuç ekranı: Vermiş olduğu siparişin son hali ve bir mesaj(Ör: 'Siparişiniz başarı bir şekilde oluşturuldu.' diyebilirsiniz. )
- Müşteri istediği kadar salata, peynir ve et ekleyebilmelidir. Seçilen ürünler sırasıyla peynir, salata ve et olacak şekilde dizilmelidir.

  **Ör-1:** Müşteri 2 tane peynir ve 1 et seçtiyse;

  ```html
  <div class="burger">
    <div class="bread-top"></div>
    <div class="cheese"></div>
    <div class="cheese"></div>
    <div class="meat"></div>
    <div class="bread-bottom"></div>
  </div>
  ```

  **Ör-2:** Müşteri 1 tane peynir, 1 adet salata ve 1 et seçtiyse;

  ```html
  <div class="burger">
    <div class="bread-top"></div>
    <div class="cheese"></div>
    <div class="salad"></div>
    <div class="meat"></div>
    <div class="bread-bottom"></div>
  </div>
  ```

  **Ekran görüntüleri en alttadır.**

- Eklenen ürünlerin birim fiyatları olacak ve altta bu toplam fiyat gösterilmelidir.

## Ürün bilgileri

Ürünlerin birim fiyatları alttaki gibidir.

```js
const INGREDIENT_UNIT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
};
```

**Sipariş Başlangıç Tutarı: 4.00'dür** ve eklenen her ürün hesaplanıp(**adet \* birim fiyat**) başlangıç fiyatının üstüne eklenmelidir.

## Yardımcı css kuralları

```css
.burger {
  width: 700px;
  height: 600px;
}

.bread-top {
  height: 20%;
  width: 80%;
  background: linear-gradient(#bc581e, #e27b36);
  border-radius: 50% 50% 0 0;
  box-shadow: inset -15px 0 #c15711;
  margin: 2% auto;
  position: relative;
}

.bread-bottom {
  height: 13%;
  width: 80%;
  background: linear-gradient(#f08e4a, #e27b36);
  border-radius: 0 0 30px 30px;
  box-shadow: inset -15px 0 #c15711;
  margin: 2% auto;
}

.salad {
  width: 85%;
  height: 7%;
  margin: 2% auto;
  background: linear-gradient(#228c1d, #91ce50);
  border-radius: 20px;
}

.cheese {
  width: 90%;
  height: 4.5%;
  margin: 2% auto;
  background: linear-gradient(#f4d004, #d6bb22);
  border-radius: 20px;
}

.meat {
  width: 85%;
  height: 7%;
  margin: 2% auto;
  background: linear-gradient(#228c1d, #91ce50);
  border-radius: 20px;
}
```

## Ekran Görüntüleri

### Başlangıç Noktası

![starting-point](mcking-burger-online-furk2sahin/images/starting-point.jpg)

### Örnek-01

![example-01](mcking-burger-online-furk2sahin/images/example-01.jpg)

### Örnek-02

![example-02](mcking-burger-online-furk2sahin/images/example-02.jpg)
