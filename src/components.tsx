import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, User, Search, Heart, ArrowLeft, X, Plus, Minus, ArrowRight } from 'lucide-react';
import { View, Product, CartItem } from './types';

// --- Components ---

export const Header: React.FC<{ 
  onBack?: () => void; 
  cartCount?: number;
  onCartClick?: () => void;
  transparent?: boolean;
}> = ({ onBack, cartCount, onCartClick, transparent = false }) => (
  <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 transition-colors duration-500 ${transparent ? 'bg-transparent' : 'bg-black/80 backdrop-blur-md'}`}>
    <div className="flex items-center gap-8">
      {onBack ? (
        <button 
          onClick={onBack}
          className="flex items-center justify-center hover:text-gold transition-colors"
        >
          <ArrowLeft className="size-5" />
        </button>
      ) : (
        <div className="text-[10px] font-medium tracking-[0.3em] uppercase opacity-50">EST. 2024</div>
      )}
    </div>
    
    <button 
      onClick={() => window.dispatchEvent(new CustomEvent('nav-home'))}
      className="absolute left-1/2 -translate-x-1/2 text-xl font-light tracking-[0.5em] uppercase hover:text-gold transition-colors"
    >
      SOLEVAULT
    </button>

    <div className="flex items-center gap-6">
      <button className="hover:text-gold transition-colors">
        <Search className="size-5 font-light" />
      </button>
      <button 
        onClick={onCartClick}
        className="relative hover:text-gold transition-colors"
      >
        <ShoppingBag className="size-5 font-light" />
        {cartCount && cartCount > 0 ? (
          <span className="absolute -top-1 -right-1 bg-gold text-black text-[8px] font-bold size-3.5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        ) : null}
      </button>
    </div>
  </header>
);

export const ProductCard: React.FC<{ product: Product; onClick: () => void }> = ({ product, onClick }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    onClick={onClick}
    className="flex flex-col gap-6 group cursor-pointer"
  >
    <div className="relative aspect-square bg-[#f5f5f5] rounded-xl overflow-hidden flex items-center justify-center p-8">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
        referrerPolicy="no-referrer"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      <button className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:text-gold">
        <Heart className="size-5 text-black/40 hover:text-gold" />
      </button>
    </div>
    <div className="flex flex-col items-center text-center gap-1">
      <p className="text-[9px] font-medium text-gold uppercase tracking-[0.3em]">{product.brand}</p>
      <h3 className="text-sm font-light tracking-widest uppercase text-white/90">{product.name}</h3>
      <p className="text-sm font-medium text-white/60">₹{product.price.toLocaleString()}</p>
    </div>
  </motion.div>
);

export const CartItemRow: React.FC<{ 
  item: CartItem; 
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemove: (id: string, size: string) => void;
}> = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}) => (
  <div className="flex gap-8 py-8 border-b border-white/5">
    <div className="w-32 aspect-square bg-[#f5f5f5] rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center p-4">
      <img src={item.image} alt={item.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
    </div>
    <div className="flex flex-1 flex-col justify-between py-2">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <p className="text-[9px] font-medium text-gold uppercase tracking-[0.2em]">{item.brand}</p>
          <h3 className="text-lg font-light tracking-widest uppercase text-white">{item.name}</h3>
          <p className="text-sm text-white/40 font-light">Size: {item.selectedSize}</p>
        </div>
        <button 
          onClick={() => onRemove(item.id, item.selectedSize)}
          className="text-white/20 hover:text-white transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 border border-white/10 px-4 py-2">
          <button 
            onClick={() => onUpdateQuantity(item.id, item.selectedSize, -1)}
            className="text-white/40 hover:text-white transition-colors"
          >
            <Minus className="size-3" />
          </button>
          <span className="text-white font-light text-sm w-4 text-center">{item.quantity}</span>
          <button 
            onClick={() => onUpdateQuantity(item.id, item.selectedSize, 1)}
            className="text-white/40 hover:text-white transition-colors"
          >
            <Plus className="size-3" />
          </button>
        </div>
        <p className="text-lg font-medium text-white">₹{(item.price * item.quantity).toLocaleString()}</p>
      </div>
    </div>
  </div>
);
