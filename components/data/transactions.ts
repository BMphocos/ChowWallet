const TRANSACTIONS: Transaction[] = [
{ id: 1, vendor: "Auntie Muni", type: "debit", amount: 25.0, time: "Today, 12:43 PM", icon: "🍛" },
{ id: 2, vendor: "MoMo Top Up", type: "credit", amount: 10.0, time: "Today, 9:00 AM", icon: "💸" },
{ id: 3, vendor: "Mama Efua Kitchen", type: "debit", amount: 18.5, time: "Yesterday, 7:30 PM", icon: "🍲" },
{ id: 4, vendor: "MoMo Top Up", type: "credit", amount: 50.0, time: "Mon, 8:00 AM", icon: "💸" },
{ id: 5, vendor: "Kofi Brokeman", type: "debit", amount: 12.0, time: "Sun, 1:15 PM", icon: "🌯" },
];

const ALL_TRANSACTIONS = [
{ id: 1,  vendor: "Auntie Muni's Kitchen", label: "Food Order",   type: "debit"  as const, amount: 25.00, time: "Today, 12:43 PM",    icon: "🍛", status: "Delivered",  ref: "CW-8821" },
{ id: 2,  vendor: "MoMo Top Up",           label: "Wallet Top Up",type: "credit" as const, amount: 10.00, time: "Today, 9:00 AM",      icon: "💸", status: "Completed",  ref: "MT-4412" },
{ id: 3,  vendor: "Mama Efua Kitchen",     label: "Food Order",   type: "debit"  as const, amount: 18.50, time: "Yesterday, 7:30 PM",  icon: "🍲", status: "Delivered",  ref: "CW-8814" },
{ id: 4,  vendor: "MoMo Top Up",           label: "Wallet Top Up",type: "credit" as const, amount: 50.00, time: "Mon, 8:00 AM",        icon: "💸", status: "Completed",  ref: "MT-4310" },
{ id: 5,  vendor: "Kofi's Brokeman Spot",  label: "Food Order",   type: "debit"  as const, amount: 12.00, time: "Sun, 1:15 PM",        icon: "🌯", status: "Delivered",  ref: "CW-8799" },
{ id: 6,  vendor: "Accra Grill House",     label: "Food Order",   type: "debit"  as const, amount: 55.00, time: "Sat, 6:45 PM",        icon: "🔥", status: "Delivered",  ref: "CW-8780" },
{ id: 7,  vendor: "Green Bowl Co.",        label: "Food Order",   type: "debit"  as const, amount: 32.00, time: "Fri, 12:00 PM",       icon: "🥗", status: "Delivered",  ref: "CW-8771" },
{ id: 8,  vendor: "MoMo Top Up",           label: "Wallet Top Up",type: "credit" as const, amount: 100.0, time: "Wed, 9:30 AM",        icon: "💸", status: "Completed",  ref: "MT-4288" },
{ id: 9,  vendor: "Mama Efua Kitchen",     label: "Food Order",   type: "debit"  as const, amount: 22.00, time: "Tue, 8:00 PM",        icon: "🍲", status: "Cancelled",  ref: "CW-8755" },
{ id: 10, vendor: "Auntie Muni's Kitchen", label: "Food Order",   type: "debit"  as const, amount: 30.00, time: "Last Mon, 1:10 PM",   icon: "🍛", status: "Delivered",  ref: "CW-8740" },
];