
// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import ArhisImage from '../images/lenta/arkhyz.jpg';
import ChelyabinskImage from '../images/lenta/chelyabinsk-oblast.jpg';
import IvanovoImage from '../images/lenta/ivanovo.jpg';
import KamchatkaImage from '../images/lenta/kamchatka.jpg';
import HolmogorskyImage from '../images/lenta/kholmogorsky-rayon.jpg';
import BaikalImage from '../images/lenta/baikal.jpg';


export default  [
  // меняем исходные пути на переменные
  { name: 'Arhis', link: ArhisImage },
  { name: 'Chelyabinsk', link: ChelyabinskImage },
  { name: 'Ivanovo', link: IvanovoImage },
  { name: 'Kamchatka', link: KamchatkaImage },
  { name: 'Holmogorsky', link: HolmogorskyImage },
  { name: 'Baikal', link: BaikalImage },
];