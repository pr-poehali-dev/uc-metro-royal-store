import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  uc: number;
  price: number;
  bonus?: string;
  popular?: boolean;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const products: Product[] = [
  { id: 1, name: 'Стартовый пакет', uc: 60, price: 59, bonus: '+6 UC' },
  { id: 2, name: 'Базовый пакет', uc: 325, price: 299, bonus: '+32 UC' },
  { id: 3, name: 'Популярный пакет', uc: 660, price: 599, bonus: '+66 UC', popular: true },
  { id: 4, name: 'Выгодный пакет', uc: 1800, price: 1499, bonus: '+180 UC', popular: true },
  { id: 5, name: 'Премиум пакет', uc: 3850, price: 2999, bonus: '+385 UC' },
  { id: 6, name: 'Мега пакет', uc: 8100, price: 5999, bonus: '+810 UC' },
];

const reviews: Review[] = [
  { id: 1, name: 'Александр', rating: 5, text: 'Быстрая доставка UC, всё пришло за 2 минуты!', date: '15.11.2024' },
  { id: 2, name: 'Мария', rating: 5, text: 'Отличные цены, заказываю уже не первый раз', date: '12.11.2024' },
  { id: 3, name: 'Дмитрий', rating: 4, text: 'Всё хорошо, но хотелось бы больше способов оплаты', date: '08.11.2024' },
  { id: 4, name: 'Елена', rating: 5, text: 'Надежный магазин, рекомендую!', date: '05.11.2024' },
];

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const totalUC = cart.reduce((sum, item) => sum + item.uc, 0);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-cyan/5 via-transparent to-cyber-purple/5 pointer-events-none" />
      
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-card/80 border-b border-primary/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-orbitron font-bold text-primary neon-text">
              UC МЕТРО РОЯЛЬ
            </h1>
            <div className="hidden md:flex items-center gap-6">
              {['home', 'catalog', 'prices', 'reviews', 'faq', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`font-rajdhani font-semibold transition-all duration-300 ${
                    activeSection === section ? 'text-primary neon-text' : 'text-foreground/70 hover:text-primary'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'prices' && 'Цены'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'faq' && 'FAQ'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative border-primary/50 hover:border-primary">
                  <Icon name="ShoppingCart" className="mr-2" size={20} />
                  Корзина
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground animate-pulse-glow">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-card border-primary/50 w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="font-orbitron text-primary neon-text">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map((item, index) => (
                        <Card key={index} className="p-4 bg-muted border-primary/30">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-muted-foreground">{item.uc} UC</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <p className="font-bold text-accent">{item.price} ₽</p>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeFromCart(index)}
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <div className="border-t border-primary/50 pt-4 space-y-2">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Всего UC:</span>
                          <span className="text-primary">{totalUC} UC</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold">
                          <span>Итого:</span>
                          <span className="text-accent neon-text">{totalPrice} ₽</span>
                        </div>
                      </div>
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-border font-orbitron text-lg">
                        Оформить заказ
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <section id="home" className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
            <h2 className="text-4xl md:text-6xl font-orbitron font-black text-primary neon-text leading-tight">
              UC ДЛЯ PUBG MOBILE
            </h2>
            <p className="text-xl md:text-2xl text-foreground/80 font-rajdhani font-medium">
              Быстро • Надежно • Выгодно
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Пополняй свой баланс UC за секунды. Все операции безопасны и мгновенны.
            </p>
            <div className="flex gap-4 justify-center pt-6">
              <Button
                size="lg"
                onClick={() => scrollToSection('catalog')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 neon-border font-orbitron text-lg"
              >
                <Icon name="Zap" className="mr-2" />
                Купить UC
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('faq')}
                className="border-secondary/50 hover:border-secondary font-orbitron text-lg"
              >
                <Icon name="HelpCircle" className="mr-2" />
                Как купить?
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-12 text-primary neon-text">
            Каталог пакетов UC
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products.map((product) => (
              <Card
                key={product.id}
                className={`relative p-6 bg-card/80 backdrop-blur border-2 transition-all duration-300 hover:scale-105 hover:border-primary ${
                  product.popular ? 'border-accent' : 'border-primary/30'
                }`}
              >
                {product.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground animate-pulse-glow">
                    <Icon name="Star" size={14} className="mr-1" />
                    Популярный
                  </Badge>
                )}
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-orbitron font-bold text-primary">{product.name}</h3>
                  <div className="py-4">
                    <p className="text-5xl font-bold text-foreground">{product.uc}</p>
                    <p className="text-sm text-muted-foreground mt-1">Unknown Cash</p>
                    {product.bonus && (
                      <Badge variant="secondary" className="mt-2 bg-secondary/20 text-secondary border border-secondary/50">
                        {product.bonus} бонус
                      </Badge>
                    )}
                  </div>
                  <div className="border-t border-primary/30 pt-4">
                    <p className="text-3xl font-bold text-accent neon-text mb-4">{product.price} ₽</p>
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-rajdhani font-bold"
                    >
                      <Icon name="ShoppingCart" className="mr-2" size={18} />
                      В корзину
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="prices" className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-12 text-primary neon-text">
            Прозрачные цены
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/80 border-primary/30 text-center">
              <Icon name="Zap" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-orbitron font-bold mb-2">Мгновенная доставка</h3>
              <p className="text-muted-foreground">UC поступают на счет за 1-5 минут</p>
            </Card>
            <Card className="p-6 bg-card/80 border-primary/30 text-center">
              <Icon name="Shield" className="mx-auto mb-4 text-accent" size={48} />
              <h3 className="text-xl font-orbitron font-bold mb-2">Безопасность</h3>
              <p className="text-muted-foreground">Все транзакции защищены</p>
            </Card>
            <Card className="p-6 bg-card/80 border-primary/30 text-center">
              <Icon name="Gift" className="mx-auto mb-4 text-secondary" size={48} />
              <h3 className="text-xl font-orbitron font-bold mb-2">Бонусы</h3>
              <p className="text-muted-foreground">К каждому пакету дополнительные UC</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-12 text-primary neon-text">
            Отзывы клиентов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6 bg-card/80 border-primary/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-lg">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-accent fill-accent" />
                    ))}
                  </div>
                </div>
                <p className="text-foreground/80">{review.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-12 text-primary neon-text">
            Вопросы и ответы
          </h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-4">
            <AccordionItem value="item-1" className="bg-card/80 border border-primary/30 px-6 rounded">
              <AccordionTrigger className="text-lg font-rajdhani font-bold hover:text-primary">
                Как долго идут UC на аккаунт?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                UC поступают на ваш игровой аккаунт в течение 1-5 минут после оплаты. В редких случаях доставка может занять до 30 минут.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-card/80 border border-primary/30 px-6 rounded">
              <AccordionTrigger className="text-lg font-rajdhani font-bold hover:text-primary">
                Какие способы оплаты доступны?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Мы принимаем оплату банковскими картами, электронными кошельками, а также через мобильные операторы.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-card/80 border border-primary/30 px-6 rounded">
              <AccordionTrigger className="text-lg font-rajdhani font-bold hover:text-primary">
                Безопасно ли покупать UC у вас?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, абсолютно безопасно. Мы используем официальные методы пополнения и не запрашиваем пароли от вашего аккаунта.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-card/80 border border-primary/30 px-6 rounded">
              <AccordionTrigger className="text-lg font-rajdhani font-bold hover:text-primary">
                Что делать, если UC не пришли?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Свяжитесь с нашей службой поддержки через раздел "Контакты". Мы решим любую проблему в течение часа.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-12 text-primary neon-text">
            Контакты
          </h2>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Card className="p-8 bg-card/80 border-primary/30">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4">
                  <Icon name="MessageCircle" className="text-primary" size={32} />
                  <div className="text-left">
                    <p className="font-bold text-lg">Telegram</p>
                    <p className="text-primary">@ucmetro_support</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <Icon name="Mail" className="text-accent" size={32} />
                  <div className="text-left">
                    <p className="font-bold text-lg">Email</p>
                    <p className="text-primary">support@ucmetro.ru</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <Icon name="Clock" className="text-secondary" size={32} />
                  <div className="text-left">
                    <p className="font-bold text-lg">Режим работы</p>
                    <p className="text-muted-foreground">24/7 без выходных</p>
                  </div>
                </div>
              </div>
            </Card>
            <p className="text-muted-foreground">
              Ответим на все вопросы в течение 15 минут
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-primary/50 py-8 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground font-rajdhani">
            © 2024 UC Метро Рояль. Все права защищены.
          </p>
          <p className="text-sm text-muted-foreground/60 mt-2">
            Мы не являемся официальным представителем PUBG Mobile
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
