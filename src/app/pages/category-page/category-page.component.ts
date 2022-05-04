import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomUtilsService } from 'src/app/services/customUtils.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  category: string;

  priceBoundingForm = this.fb.group({
    minPrice: [0],
    maxPrice: [1000000]
  })

  categoryName: string = '';
  categoryDescription: string = '';

  constructor(
    private fb: FormBuilder,
    private utils: CustomUtilsService
  ) {
    this.category = this.utils.getCategory();
  }

  ngOnInit(): void {
    switch (this.category) {
      case 'headphones':
        this.categoryName = 'Auriculares';
        this.categoryDescription = 'Los auriculares son uno de los elementos imprescindibles para disfrutar del sonido de calidad en cualquier lugar, sin molestar a nadie y sin que nadie te moleste a ti. En nuestra tienda online puedes encontrar auriculares bluetooth, para que un cable no te limite; cascos gaming y cascos para Djs y auriculares de botón. Descubre todos los modelos: para disfrutar al aire libre, auriculares resistentes al agua o con micrófono, para que no pierdas ninguna llamada y para escuchar música en cualquier lugar.';
        break;
      case 'laptops':
        this.categoryName = 'Portátiles';
        this.categoryDescription = 'Exprime hasta la última hora del día con cualquiera de nuestros portátiles de las mejores marcas: HP, Acer, MSI, Lenovo, Dell, Gigabyte, LG o Asus. Portátiles para gamers que juegan a todas horas, profesionales que llevan su oficina siempre encima, estudiantes que van de aquí para allá o simplemente para disfrutar de tus series favoritas y navegar por Internet. En PcComponentes te ofrecemos el mayor catálogo de ordenadores portátiles y convertibles 2 en 1. Visita nuestra sección especial de portátiles baratos o consulta nuestra propuesta de mejores portátiles ligeros que puedes llevar a todas partes.';
        break;
      case 'furniture':
        this.categoryName = 'Muebles';
        this.categoryDescription = '¡Observa nuestra exclusiva selección de muebles! Puede que encuentres algo que no sabías que necesitabas';
        break;
      case 'sports':
        this.categoryName = 'Deporte';
        this.categoryDescription = 'El deporte es salud, aquí tienes una serie de productos que te pueden ayudar a mejorar tu rendimiento deportivo y calidad de vida';
        break;
      case 'phones':
        this.categoryName = 'Móviles';
        this.categoryDescription = 'Los teléfonos móviles, también llamados smartphone, son una herramienta indispensable en nuestro día a día. Aquí también puedes encontrar una gran selección de wearables,pulseras y relojes deportivos, GPS y otros accesorios para el coche. Todo lo que necesitas para moverte de un lado a otro sin problemas.';
        break;
      case 'games':
        this.categoryName = 'Juegos';
        this.categoryDescription = '¡Disfruta del mejor ocio con nuestros productos!';
        break;
      case 'clothing':
        this.categoryName = 'Ropa y Moda';
        this.categoryDescription = '¡Observa nuestra exquisita selección de productos relacionados con la vestimenta y moda sacada de Aliexpress!';
        break;
      case 'discount':
        this.categoryName = 'Productos en oferta';
        this.categoryDescription = '¡Disfruta de nuestros productos con un descuento superior al 10%!';
        break;
      case 'promotion':
        this.categoryName = 'Promociones';
        this.categoryDescription = '¡Disfruta de nuestras mejores promociones con productos con un descuento superior al 30%!';
        break;
    }
  }
}
