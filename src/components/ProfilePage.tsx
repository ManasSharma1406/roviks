import { BrandFooter } from '../App';

export const ProfilePage = () => {
  const user = {
    name: "Manas Sharma",
    email: "manas.sharma@example.com",
    phone: "+91 95991 99537",
    memberSince: "June 2026",
    address: {
      street: "26 Stolichnaya St, Suite 4",
      city: "Moscow",
      country: "Russia",
      zip: "101000"
    }
  };

  const orders = [
    {
      id: "ROV-83492",
      date: "June 08, 2026",
      status: "In Transit",
      total: "$964.96",
      item: {
        title: "NAVY HOPSACK SPORT COAT",
        subtitle: "CLASSIC TAILORING",
        img: "/assets/navy_hopsack_sport_coat.png",
        size: "M",
        qty: 1
      }
    },
    {
      id: "ROV-81920",
      date: "May 18, 2026",
      status: "Delivered",
      total: "$1,272.00",
      item: {
        title: "MID GREY SHARKSKIN SUIT",
        subtitle: "PREMIUM TWO-PIECE",
        img: "/assets/grey_suit.png",
        size: "M",
        qty: 1
      }
    }
  ];

  return (
    <div className="pt-28 pb-12 w-full min-h-screen text-white flex flex-col items-center overflow-y-visible bg-[#000000] z-20 relative px-6 md:px-12">
      <div className="w-full max-w-6xl flex flex-col gap-12 min-h-[75vh]">
        {/* Title */}
        <div className="border-b border-white/5 pb-8 flex justify-between items-end">
          <div>
            <h1 
              className="text-4xl md:text-5xl font-extrabold tracking-widest text-white uppercase"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              My Account
            </h1>
            <p className="text-[10px] font-mono tracking-widest text-white/40 uppercase mt-1">
              Welcome back, {user.name}
            </p>
          </div>
          <button className="px-5 py-2 border border-white/10 hover:border-white rounded-full bg-white/5 hover:bg-white text-white hover:text-black text-[10px] tracking-wider uppercase font-mono transition-all duration-300 cursor-pointer">
            Sign Out
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Details (1/3 Width) */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 border-b border-white/5 pb-2">
                Personal Information
              </h2>
              <div className="flex flex-col gap-3 font-sans text-sm">
                <div>
                  <span className="text-[10px] font-mono text-white/30 uppercase block mb-0.5">Name</span>
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/30 uppercase block mb-0.5">Email</span>
                  <span className="text-white/80">{user.email}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/30 uppercase block mb-0.5">Phone</span>
                  <span className="text-white/80">{user.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/30 uppercase block mb-0.5">Member Since</span>
                  <span className="text-white/60">{user.memberSince}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 border-b border-white/5 pb-2">
                Primary Shipping Address
              </h2>
              <div className="font-sans text-sm text-white/80 flex flex-col gap-1.5 leading-relaxed">
                <div>{user.address.street}</div>
                <div>{user.address.city}, {user.address.zip}</div>
                <div>{user.address.country}</div>
                <button className="text-[10px] font-mono text-white/40 hover:text-white uppercase tracking-wider text-left mt-2 underline">
                  Edit Address
                </button>
              </div>
            </div>
          </div>

          {/* Order History (2/3 Width) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-white/50 border-b border-white/5 pb-2">
              Order History ({orders.length})
            </h2>

            <div className="flex flex-col gap-6">
              {orders.map((order) => (
                <div 
                  key={order.id}
                  className="border border-white/5 hover:border-white/10 rounded-2xl bg-white/[0.02] p-5 flex flex-col md:flex-row justify-between gap-6 transition-all"
                >
                  {/* Product Details */}
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-[#ececec] overflow-hidden flex items-center justify-center rounded-lg flex-shrink-0">
                      <img 
                        src={order.item.img} 
                        alt={order.item.title} 
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[9px] font-mono text-white/40 tracking-wider uppercase mb-1">{order.id} • {order.date}</span>
                      <h3 className="text-xs font-bold tracking-wider text-white uppercase">{order.item.title}</h3>
                      <p className="text-[9px] text-white/50 tracking-wider uppercase mt-0.5">{order.item.subtitle}</p>
                      <span className="text-[10px] font-mono text-white/30 uppercase mt-2">Size: {order.item.size} • Qty: {order.item.qty}</span>
                    </div>
                  </div>

                  {/* Price & Order Status */}
                  <div className="flex md:flex-col justify-between md:justify-center items-end gap-2 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                    <div className="text-right md:mb-2">
                      <span className="text-[9px] font-mono text-white/30 uppercase block">Total Price</span>
                      <span className="font-mono text-sm font-bold text-white">{order.total}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest font-bold ${order.status === 'In Transit' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[calc(100%+48px)] md:w-[calc(100%+96px)] -mx-6 md:-mx-12 mt-16">
        <BrandFooter />
      </div>
    </div>
  );
};
