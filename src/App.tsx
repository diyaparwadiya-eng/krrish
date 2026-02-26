import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';
import { View, Product, CartItem } from './types';
import { PRODUCTS, BRANDS } from './constants';
import { Header, ProductCard, CartItemRow } from './components';
import ColorBends from './components/ColorBends';
import Plasma from './components/Plasma/Plasma';

export default function App() {
  const [currentView, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState<string>('All');

  useEffect(() => {
    const handleHome = () => {
      setView('home');
      setSelectedProduct(null);
    };
    window.addEventListener('nav-home', handleHome);
    return () => window.removeEventListener('nav-home', handleHome);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const addToCart = (product: Product, size: string) => {
    if (!size) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, selectedSize: size, quantity: 1 }];
    });
    setView('vault');
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setActiveImageIndex(0);
    setView('product');
    window.scrollTo(0, 0);
  };

  const renderHome = () => (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-8">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src="https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-trainer-sneaker--BP9U1PDN02_PM2_Front%20view.jpg" 
          alt="Luxury Sneaker" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        
        <div className="relative z-10 flex flex-col items-center gap-12">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col gap-4"
          >
            <h1 className="text-6xl md:text-8xl font-light tracking-[0.3em] uppercase leading-none">
              SOLEVAULT
            </h1>
            <p className="text-gold text-xs font-medium tracking-[0.5em] uppercase">
              Where Sneakers Meet Status
            </p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            onClick={() => setView('shop')}
            className="group flex flex-col items-center gap-4"
          >
            <span className="text-[10px] font-medium tracking-[0.4em] uppercase text-white/60 group-hover:text-gold transition-colors">Explore Collection</span>
            <div className="w-px h-16 bg-white/20 group-hover:bg-gold transition-colors" />
          </motion.button>
        </div>
      </section>

      <section className="py-32 px-8 md:px-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-gold text-[10px] font-medium tracking-[0.4em] uppercase">Curated Selection</p>
            <h2 className="text-4xl font-light tracking-widest uppercase">Featured Drops</h2>
          </div>
          <button onClick={() => setView('shop')} className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/40 hover:text-gold transition-colors border-b border-white/10 pb-2">View All Pieces</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {PRODUCTS.slice(0, 3).map(p => (
            <ProductCard key={p.id} product={p} onClick={() => handleProductClick(p)} />
          ))}
        </div>
      </section>

      <section className="relative h-[80vh] w-full overflow-hidden flex items-center pl-4 md:pl-8 pr-8 md:pr-24">
        <Plasma 
          color="#C9A96E"
          speed={0.5}
          scale={1.5}
          opacity={0.4}
        />
        <img 
          src="https://marketplace.mainstreet.co.in/cdn/shop/files/Artboard8_a26f154c-1918-49db-8cb3-7ce3a2310839.png?v=1761459047" 
          alt="Brand Story" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 z-[1]"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 max-w-2xl flex flex-col gap-8">
          <h2 className="text-5xl font-light tracking-widest uppercase leading-tight text-black">The Art of <br /> Rare Footwear</h2>
          <p className="text-black/70 font-light leading-relaxed tracking-wide">
            SoleVault is more than a marketplace. It is a sanctuary for the most exclusive silhouettes in the world. Each pair is a testament to the intersection of luxury fashion and streetwear culture.
          </p>
          <button className="text-black text-[10px] font-medium tracking-[0.4em] uppercase border border-black/30 px-8 py-4 hover:bg-black hover:text-white transition-all duration-500 w-fit">Our Philosophy</button>
        </div>
      </section>

      <footer className="py-24 px-8 md:px-24 border-t border-white/5 bg-charcoal">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="flex flex-col gap-8">
            <h3 className="text-xl font-light tracking-[0.4em] uppercase">SOLEVAULT</h3>
            <p className="text-white/40 text-xs font-light leading-relaxed tracking-wide">The definitive destination for luxury sneaker enthusiasts.</p>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-medium text-gold uppercase tracking-[0.3em]">Collections</h4>
            <div className="flex flex-col gap-3 text-xs font-light text-white/60">
              <a href="#" className="hover:text-white transition-colors">Heritage</a>
              <a href="#" className="hover:text-white transition-colors">Modern Classics</a>
              <a href="#" className="hover:text-white transition-colors">Collaborations</a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-medium text-gold uppercase tracking-[0.3em]">Concierge</h4>
            <div className="flex flex-col gap-3 text-xs font-light text-white/60">
              <a href="#" className="hover:text-white transition-colors">Authenticity</a>
              <a href="#" className="hover:text-white transition-colors">Shipping</a>
              <a href="#" className="hover:text-white transition-colors">Returns</a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-[10px] font-medium text-gold uppercase tracking-[0.3em]">Newsletter</h4>
            <div className="flex gap-2 border-b border-white/10 pb-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent text-[10px] tracking-widest focus:outline-none w-full"
              />
              <button className="text-gold"><ArrowRight className="size-4" /></button>
            </div>
          </div>
        </div>
        <div className="mt-24 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-medium text-white/20 uppercase tracking-[0.3em]">
          <p>© 2024 SOLEVAULT INC.</p>
          <div className="flex gap-8">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Legal</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );

  const renderShop = () => {
    const filteredProducts = activeBrand === 'All' 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.brand === activeBrand);

    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="flex flex-col pt-32 pb-32 px-8 md:px-24"
      >
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-8">
          <h2 className="text-5xl font-light tracking-[0.2em] uppercase">Collection</h2>
          <div className="flex gap-12 text-[10px] font-medium tracking-[0.3em] uppercase text-white/40">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="hover:text-gold transition-colors flex items-center gap-2"
            >
              Filter <ChevronDown className="size-3" />
            </button>
            <button className="hover:text-gold transition-colors flex items-center gap-2">Sort <ChevronDown className="size-3" /></button>
            <span className="text-white/20">{filteredProducts.length} Pieces</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} onClick={() => handleProductClick(p)} />
          ))}
        </div>

        <div className="mt-32 flex flex-col items-center gap-8">
          <div className="w-px h-24 bg-white/10" />
          <button className="text-[10px] font-medium tracking-[0.4em] uppercase text-white/40 hover:text-gold transition-colors">Load More Pieces</button>
        </div>

        {/* Filter Sidebar */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
              />
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-charcoal z-[70] p-12 flex flex-col gap-16"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-light tracking-[0.3em] uppercase">Filters</h3>
                  <button onClick={() => setIsFilterOpen(false)}><X className="size-6" /></button>
                </div>

                <div className="flex flex-col gap-8">
                  <h4 className="text-[10px] font-medium text-gold uppercase tracking-[0.3em]">Brand</h4>
                  <div className="flex flex-wrap gap-3">
                    {['All', ...BRANDS].map(brand => (
                      <button 
                        key={brand}
                        onClick={() => setActiveBrand(brand)}
                        className={`px-6 py-3 text-[10px] font-medium uppercase tracking-[0.2em] border transition-all duration-500 ${
                          activeBrand === brand 
                            ? 'bg-white text-black border-white' 
                            : 'border-white/10 text-white/40 hover:border-white/30'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  <h4 className="text-[10px] font-medium text-gold uppercase tracking-[0.3em]">Price Range</h4>
                  <div className="flex flex-col gap-4">
                    <div className="h-px bg-white/10 relative">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 size-3 bg-white rounded-full" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 size-3 bg-white rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] font-light tracking-widest text-white/40">
                      <span>₹0</span>
                      <span>₹1,00,000+</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="mt-auto w-full bg-white text-black py-5 text-[10px] font-medium uppercase tracking-[0.3em] hover:bg-gold transition-colors"
                >
                  Apply Filters
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const renderProduct = () => {
    if (!selectedProduct) return null;
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="flex flex-col md:flex-row min-h-screen pt-24"
      >
        <div className="w-full md:w-3/5 bg-[#f5f5f5] h-[70vh] md:h-screen sticky top-0 flex flex-col items-center justify-center p-12 md:p-24 gap-8">
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={selectedProduct.images[activeImageIndex] || selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>
          
          {selectedProduct.images.length > 1 && (
            <div className="flex gap-4">
              {selectedProduct.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`size-16 border p-2 transition-all duration-500 ${
                    activeImageIndex === idx ? 'border-gold bg-white' : 'border-black/5 bg-white/50 hover:border-black/20'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-2/5 px-8 md:px-16 py-16 md:py-32 flex flex-col justify-center">
          <div className="flex flex-col gap-12 max-w-md">
            <div className="flex flex-col gap-4">
              <p className="text-gold text-[10px] font-medium tracking-[0.4em] uppercase">{selectedProduct.brand} // {selectedProduct.category}</p>
              <h2 className="text-4xl font-light tracking-[0.2em] uppercase leading-tight text-white">{selectedProduct.name}</h2>
              <p className="text-2xl font-light text-white/80 mt-4">₹{selectedProduct.price.toLocaleString()}</p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">Select Size (UK)</h3>
                <button className="text-[9px] font-medium text-gold underline uppercase tracking-[0.2em]">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {selectedProduct.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-4 text-[11px] font-medium transition-all duration-500 border ${
                      selectedSize === size 
                        ? 'bg-white text-black border-white' 
                        : 'bg-transparent border-white/10 text-white/60 hover:border-white/40'
                    }`}
                  >
                    {size.replace('UK ', '')}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <button 
                onClick={() => addToCart(selectedProduct, selectedSize)}
                className="w-full bg-gold text-black font-medium py-6 hover:bg-white transition-all duration-500 uppercase tracking-[0.3em] text-xs gold-glow"
              >
                Add to Cart
              </button>
              <button className="w-full border border-white/10 text-white font-medium py-6 hover:border-white transition-all duration-500 uppercase tracking-[0.3em] text-xs">
                Add to Wishlist
              </button>
            </div>

            <div className="flex flex-col gap-6 pt-12 border-t border-white/5">
              <div className="flex flex-col gap-3">
                <h4 className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">Description</h4>
                <p className="text-xs font-light leading-relaxed tracking-wide text-white/60">
                  {selectedProduct.description}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">Details</h4>
                <ul className="text-[10px] font-light tracking-widest text-white/40 flex flex-col gap-2">
                  <li>• Premium Leather Construction</li>
                  <li>• Hand-finished Details</li>
                  <li>• Exclusive Release</li>
                  <li>• Made in Italy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderVault = () => (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col pt-32 pb-32 px-8 md:px-24 min-h-screen"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-5xl font-light tracking-[0.2em] uppercase mb-24">Shopping Bag</h2>
        
        <div className="flex flex-col">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center py-32 gap-8 border-t border-white/5">
              <p className="text-white/20 text-xs font-medium uppercase tracking-[0.4em]">Your bag is empty</p>
              <button 
                onClick={() => setView('shop')}
                className="text-gold text-[10px] font-medium uppercase tracking-[0.4em] border-b border-gold/30 pb-2"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="border-t border-white/5">
                {cart.map((item) => (
                  <CartItemRow 
                    key={`${item.id}-${item.selectedSize}`} 
                    item={item} 
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>

              <div className="mt-24 flex flex-col md:flex-row justify-between items-start gap-16">
                <div className="flex flex-col gap-4 max-w-xs">
                  <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">Shipping Info</h3>
                  <p className="text-[10px] font-light leading-relaxed tracking-widest text-white/20">
                    Complimentary express shipping on all luxury orders. Delivered in signature SoleVault packaging.
                  </p>
                </div>
                
                <div className="flex flex-col gap-8 w-full md:w-96">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                      <span>Shipping</span>
                      <span className="text-gold">Complimentary</span>
                    </div>
                    <div className="flex justify-between text-xl font-light uppercase tracking-[0.2em] pt-4 border-t border-white/5">
                      <span>Total</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="w-full bg-white text-black font-medium py-6 hover:bg-gold transition-all duration-500 uppercase tracking-[0.3em] text-xs">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-gold selection:text-black">
      <Header 
        onBack={selectedProduct ? () => { setSelectedProduct(null); setView('shop'); } : undefined}
        cartCount={cartCount} 
        onCartClick={() => setView('vault')}
        transparent={currentView === 'home' && !selectedProduct}
      />

      <AnimatePresence mode="wait">
        {currentView === 'home' && !selectedProduct && renderHome()}
        {currentView === 'shop' && !selectedProduct && renderShop()}
        {selectedProduct && renderProduct()}
        {currentView === 'vault' && !selectedProduct && renderVault()}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-12"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8"><X className="size-8" /></button>
            <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="text-4xl font-light tracking-[0.4em] uppercase">Home</button>
            <button onClick={() => { setView('shop'); setIsMenuOpen(false); }} className="text-4xl font-light tracking-[0.4em] uppercase">Collection</button>
            <button onClick={() => { setView('vault'); setIsMenuOpen(false); }} className="text-4xl font-light tracking-[0.4em] uppercase">Bag ({cartCount})</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
