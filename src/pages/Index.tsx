import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface User {
  name: string;
  email: string;
  vipLevel: 'none' | 'bronze' | 'silver' | 'gold' | 'platinum';
  totalSpent: number;
  discount: number;
}

const products: Product[] = [
  { id: 1, name: 'Мини', uc: 16, price: 19, bonus: '+2 UC' },
  { id: 2, name: 'Стартовый', uc: 60, price: 59, bonus: '+6 UC' },
  { id: 3, name: 'Эконом', uc: 120, price: 119, bonus: '+12 UC' },
  { id: 4, name: 'Базовый', uc: 325, price: 299, bonus: '+32 UC' },
  { id: 5, name: 'Стандарт', uc: 525, price: 499, bonus: '+52 UC', popular: true },
  { id: 6, name: 'Популярный', uc: 660, price: 599, bonus: '+66 UC', popular: true },
  { id: 7, name: 'Оптимальный', uc: 1050, price: 999, bonus: '+105 UC', popular: true },
  { id: 8, name: 'Выгодный', uc: 1800, price: 1499, bonus: '+180 UC' },
  { id: 9, name: 'Продвинутый', uc: 2700, price: 2199, bonus: '+270 UC' },
  { id: 10, name: 'Премиум', uc: 3850, price: 2999, bonus: '+385 UC' },
  { id: 11, name: 'Элитный', uc: 6000, price: 4499, bonus: '+600 UC' },
  { id: 12, name: 'Мега', uc: 8100, price: 5999, bonus: '+810 UC' },
  { id: 13, name: 'Ультра', uc: 10500, price: 7499, bonus: '+1050 UC' },
  { id: 14, name: 'Максимум', uc: 16200, price: 11999, bonus: '+1620 UC' },
];

const reviews: Review[] = [
  { id: 1, name: 'Александр', rating: 5, text: 'Быстрая доставка UC, всё пришло за 2 минуты!', date: '15.11.2024' },
  { id: 2, name: 'Мария', rating: 5, text: 'Отличные цены, заказываю уже не первый раз', date: '12.11.2024' },
  { id: 3, name: 'Дмитрий', rating: 4, text: 'Всё хорошо, но хотелось бы больше способов оплаты', date: '08.11.2024' },
  { id: 4, name: 'Елена', rating: 5, text: 'Надежный магазин, рекомендую!', date: '05.11.2024' },
];

const vipLevels = {
  none: { name: 'Новичок', discount: 0, color: 'text-muted-foreground', icon: 'User', minSpent: 0 },
  bronze: { name: 'Bronze VIP', discount: 3, color: 'text-orange-400', icon: 'Award', minSpent: 1000 },
  silver: { name: 'Silver VIP', discount: 5, color: 'text-gray-400', icon: 'Medal', minSpent: 5000 },
  gold: { name: 'Gold VIP', discount: 8, color: 'text-accent', icon: 'Trophy', minSpent: 15000 },
  platinum: { name: 'Platinum VIP', discount: 12, color: 'text-primary', icon: 'Crown', minSpent: 50000 },
};

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [customUC, setCustomUC] = useState('');
  const [customPrice, setCustomPrice] = useState(0);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const UC_RATE = 1.0;

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const addCustomToCart = () => {
    if (customUC && customPrice > 0) {
      const customProduct: Product = {
        id: Date.now(),
        name: 'Кастомный пакет',
        uc: parseInt(customUC),
        price: customPrice,
      };
      setCart([...cart, customProduct]);
      setCustomUC('');
      setCustomPrice(0);
    }
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const calculateDiscount = () => {
    if (!user) return 0;
    return user.discount;
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const discountAmount = (totalPrice * calculateDiscount()) / 100;
  const finalPrice = totalPrice - discountAmount;
  const totalUC = cart.reduce((sum, item) => sum + item.uc, 0);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogin = () => {
    const mockUser: User = {
      name: 'Игрок',
      email: loginEmail,
      vipLevel: 'gold',
      totalSpent: 18500,
      discount: vipLevels.gold.discount,
    };
    setUser(mockUser);
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleRegister = () => {
    const newUser: User = {
      name: registerName,
      email: registerEmail,
      vipLevel: 'none',
      totalSpent: 0,
      discount: 0,
    };
    setUser(newUser);
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUCInput = (value: string) => {
    setCustomUC(value);
    const uc = parseInt(value) || 0;
    setCustomPrice(Math.round(uc * UC_RATE));
  };

  const handlePriceInput = (value: string) => {
    const price = parseInt(value) || 0;
    setCustomPrice(price);
    setCustomUC(Math.round(price / UC_RATE).toString());
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
              {['home', 'catalog', 'calculator', 'vip', 'reviews', 'faq'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`font-rajdhani font-semibold transition-all duration-300 ${
                    activeSection === section ? 'text-primary neon-text' : 'text-foreground/70 hover:text-primary'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'calculator' && 'Калькулятор'}
                  {section === 'vip' && 'VIP'}
                  {section === 'reviews' && 'Отзывы'}
                  {section === 'faq' && 'FAQ'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-primary/50 hover:border-primary">
                      <Icon name={vipLevels[user.vipLevel].icon as any} className="mr-2" size={18} />
                      {user.name}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-primary/50">
                    <DialogHeader>
                      <DialogTitle className="font-orbitron text-primary neon-text">Профиль</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="text-center py-4">
                        <Icon name={vipLevels[user.vipLevel].icon as any} className={`mx-auto mb-3 ${vipLevels[user.vipLevel].color}`} size={64} />
                        <h3 className={`text-2xl font-orbitron font-bold ${vipLevels[user.vipLevel].color}`}>
                          {vipLevels[user.vipLevel].name}
                        </h3>
                        <p className="text-muted-foreground mt-2">Скидка: {user.discount}%</p>
                      </div>
                      <Card className="p-4 bg-muted/50 border-primary/30">
                        <div className="space-y-2">
                          <p><span className="text-muted-foreground">Имя:</span> <span className="font-bold">{user.name}</span></p>
                          <p><span className="text-muted-foreground">Email:</span> <span className="font-bold">{user.email}</span></p>
                          <p><span className="text-muted-foreground">Потрачено:</span> <span className="font-bold text-accent">{user.totalSpent} ₽</span></p>
                        </div>
                      </Card>
                      {user.vipLevel !== 'platinum' && (
                        <Card className="p-4 bg-secondary/10 border-secondary/30">
                          <p className="text-sm text-muted-foreground">
                            До следующего уровня:{' '}
                            <span className="font-bold text-secondary">
                              {Object.entries(vipLevels).find(([key, level]) => level.minSpent > user.totalSpent)?.[1]?.minSpent! - user.totalSpent} ₽
                            </span>
                          </p>
                        </Card>
                      )}
                      <div className="flex gap-3">
                        <Button onClick={handleLogout} variant="outline" className="flex-1">
                          Выйти
                        </Button>
                        <Button onClick={handleLogout} variant="destructive" className="flex-1">
                          <Icon name="Trash2" className="mr-2" size={18} />
                          Удалить аккаунт
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-primary/50 hover:border-primary">
                      <Icon name="User" className="mr-2" size={18} />
                      Вход
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-primary/50">
                    <DialogHeader>
                      <DialogTitle className="font-orbitron text-primary neon-text">Авторизация</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="login" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Вход</TabsTrigger>
                        <TabsTrigger value="register">Регистрация</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="your@email.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="bg-muted border-primary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Пароль</Label>
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="bg-muted border-primary/30"
                          />
                        </div>
                        <Button onClick={handleLogin} className="w-full bg-primary text-primary-foreground">
                          Войти
                        </Button>
                      </TabsContent>
                      <TabsContent value="register" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-name">Имя</Label>
                          <Input
                            id="register-name"
                            placeholder="Ваше имя"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            className="bg-muted border-primary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="your@email.com"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            className="bg-muted border-primary/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-password">Пароль</Label>
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="••••••••"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            className="bg-muted border-primary/30"
                          />
                        </div>
                        <Button onClick={handleRegister} className="w-full bg-primary text-primary-foreground">
                          Зарегистрироваться
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )}
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
                <SheetContent className="bg-card border-primary/50 w-full sm:max-w-md overflow-y-auto">
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
                          <div className="flex justify-between">
                            <span>Сумма:</span>
                            <span>{totalPrice} ₽</span>
                          </div>
                          {user && user.discount > 0 && (
                            <>
                              <div className="flex justify-between text-secondary">
                                <span>Скидка VIP ({user.discount}%):</span>
                                <span>-{discountAmount.toFixed(0)} ₽</span>
                              </div>
                              <div className="flex justify-between text-xl font-bold border-t border-primary/50 pt-2">
                                <span>Итого:</span>
                                <span className="text-accent neon-text">{finalPrice.toFixed(0)} ₽</span>
                              </div>
                            </>
                          )}
                          {!user && (
                            <div className="flex justify-between text-xl font-bold">
                              <span>Итого:</span>
                              <span className="text-accent neon-text">{totalPrice} ₽</span>
                            </div>
                          )}
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
        </div>
      </nav>

      <section id="home" className="relative py-20 md:py-32 cyber-grid animate-fade-in">
        <div className="container mx-auto px-4 text-center animate-slide-in">
          <div className="max-w-4xl mx-auto space-y-6">
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
                onClick={() => scrollToSection('calculator')}
                className="border-secondary/50 hover:border-secondary font-orbitron text-lg"
              >
                <Icon name="Calculator" className="mr-2" />
                Калькулятор
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="calculator" className="py-16 bg-muted/20 relative animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-12 text-primary neon-text">
            Калькулятор UC
          </h2>
          <Card className="max-w-2xl mx-auto p-8 bg-card/80 border-2 border-primary/50">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-muted-foreground">Введите нужное количество UC или сумму в рублях</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="uc-input" className="text-lg font-orbitron">Количество UC</Label>
                  <div className="relative">
                    <Input
                      id="uc-input"
                      type="number"
                      placeholder="0"
                      value={customUC}
                      onChange={(e) => handleUCInput(e.target.value)}
                      className="bg-muted border-primary/30 text-2xl font-bold h-16 pr-16"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-primary font-orbitron">UC</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price-input" className="text-lg font-orbitron">Сумма в рублях</Label>
                  <div className="relative">
                    <Input
                      id="price-input"
                      type="number"
                      placeholder="0"
                      value={customPrice || ''}
                      onChange={(e) => handlePriceInput(e.target.value)}
                      className="bg-muted border-primary/30 text-2xl font-bold h-16 pr-16"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-accent font-orbitron">₽</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-primary/50">
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Курс: 1 UC = {UC_RATE} ₽
                </p>
                <Button
                  onClick={addCustomToCart}
                  disabled={!customUC || customPrice <= 0}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-orbitron text-lg h-14 neon-border"
                >
                  <Icon name="ShoppingCart" className="mr-2" />
                  Добавить в корзину
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="catalog" className="py-16 relative animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-12 text-primary neon-text">
            Каталог пакетов UC
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {products.map((product) => (
              <Card
                key={product.id}
                className={`relative p-6 bg-card/80 backdrop-blur border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 hover:border-primary animate-fade-in ${
                  product.popular ? 'border-accent' : 'border-primary/30'
                }`}
              >
                {product.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground animate-pulse-glow">
                    <Icon name="Star" size={14} className="mr-1" />
                    ХИТ
                  </Badge>
                )}
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-orbitron font-bold text-primary">{product.name}</h3>
                  <div className="py-4">
                    <p className="text-4xl font-bold text-foreground">{product.uc}</p>
                    <p className="text-sm text-muted-foreground mt-1">UC</p>
                    {product.bonus && (
                      <Badge variant="secondary" className="mt-2 bg-secondary/20 text-secondary border border-secondary/50">
                        {product.bonus}
                      </Badge>
                    )}
                  </div>
                  <div className="border-t border-primary/30 pt-4">
                    <p className="text-2xl font-bold text-accent neon-text mb-4">{product.price} ₽</p>
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

      <section id="vip" className="py-16 bg-muted/20 animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-12 text-primary neon-text">
            VIP статусы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {Object.entries(vipLevels).filter(([key]) => key !== 'none').map(([key, level]) => (
              <Card key={key} className="p-6 bg-card/80 border-2 border-primary/30 hover:border-primary hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-500 animate-fade-in">
                <div className="text-center space-y-4">
                  <Icon name={level.icon as any} className={`mx-auto ${level.color}`} size={64} />
                  <h3 className={`text-2xl font-orbitron font-bold ${level.color}`}>{level.name}</h3>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-accent">{level.discount}%</p>
                    <p className="text-sm text-muted-foreground">постоянная скидка</p>
                  </div>
                  <div className="border-t border-primary/30 pt-4">
                    <p className="text-sm text-muted-foreground">
                      От <span className="font-bold text-foreground">{level.minSpent} ₽</span> покупок
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-12">
            <Card className="p-6 bg-card/80 border-primary/30">
              <h3 className="text-xl font-orbitron font-bold text-center mb-4">Преимущества VIP</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Icon name="Check" className="text-primary" size={24} />
                  <span>Постоянные скидки на все покупки</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Check" className="text-primary" size={24} />
                  <span>Приоритетная поддержка 24/7</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Check" className="text-primary" size={24} />
                  <span>Эксклюзивные предложения</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Check" className="text-primary" size={24} />
                  <span>Бонусы к каждому пакету</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-12 text-primary neon-text">
            Отзывы клиентов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6 bg-card/80 border-primary/30 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 animate-fade-in">
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

      <section id="faq" className="py-16 bg-muted/20 animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-center mb-12 text-primary neon-text">
            Вопросы и ответы
          </h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-4">
            <AccordionItem value="item-1" className="bg-card/80 border border-primary/30 px-6 rounded hover:border-primary transition-all duration-300">
              <AccordionTrigger className="text-lg font-rajdhani font-bold hover:text-primary">
                Как долго идут UC на аккаунт?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                UC поступают на ваш игровой аккаунт в течение 1-5 минут после оплаты. В редких случаях доставка может занять до 30 минут.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-card/80 border border-primary/30 px-6 rounded hover:border-primary transition-all duration-300">
              <AccordionTrigger className="text-lg font-rajdhani font-bold hover:text-primary">
                Как получить VIP статус?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                VIP статус присваивается автоматически при достижении определённой суммы покупок. Скидки начисляются сразу после получения статуса.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-card/80 border border-primary/30 px-6 rounded hover:border-primary transition-all duration-300">
              <AccordionTrigger className="text-lg font-rajdhani font-bold hover:text-primary">
                Безопасно ли покупать UC у вас?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, абсолютно безопасно. Мы используем официальные методы пополнения и не запрашиваем пароли от вашего аккаунта.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-card/80 border border-primary/30 px-6 rounded hover:border-primary transition-all duration-300">
              <AccordionTrigger className="text-lg font-rajdhani font-bold hover:text-primary">
                Можно ли купить любое количество UC?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да! Используйте калькулятор UC на сайте — введите нужное количество монет или сумму в рублях, и добавьте в корзину.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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