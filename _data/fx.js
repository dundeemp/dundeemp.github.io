(async () => {
  const BASE_URL = location.origin;

  // 🔹 Add pages here
  const pages = [
    "/Group/New-Items-3.htm",
    "/Group/Restaurant-Essentials-2.htm",
    "/Group/Restaurant-Signage-4.htm",
    "/Group/Countertop-Displays-5.htm",
    "/Group/Restaurant-Tools-6.htm",
    "/Group/In-Restaurant-Engagement-1.htm",
    "/Group/Kids-Restaurant-Visits-8.htm",
    "/Group/Holidays-7.htm",
    "/Group/Raffle-9.htm",
    "/Group/Recruitment-11.htm",
    "/Group/Kids-Items-10.htm",
    "/Group/Team-Member-Appreciation-12.htm",
    "/Group/Give-Local-13.htm",
    "/Group/Back-to-School-38.htm",
    "/Group/Custard-Run--Custard-To-Go-14.htm",
    "/Group/Car-Show-15.htm",
    "/Group/Cancer-Awareness-29.htm",
    "/Group/Golf-Package-170.htm",
    "/Group/Sports-Package-172.htm",
    "/Group/Parades-37.htm",
    "/Group/Thank-You-Farmers-Project-16.htm",
    "/Group/FFA-Package-181.htm",
    "/Group/Welcome-to-Delicious-184.htm",
    "/Group/Drinkware-17.htm",
    "/Group/Curd-Nerd-18.htm",
    "/Group/Tech-Items-19.htm",
    "/Group/Business--Office-20.htm",
    "/Group/Pet-Items-161.htm",
    "/Group/Hats-21.htm",
    "/Group/Socks-183.htm",
    "/Group/T-shirts-22.htm",
    "/Group/Sweatshirts--Sweatpants-23.htm",
    "/Group/Mens-Apparel-24.htm",
    "/Group/Dress-Shirts-30.htm",
    "/Group/Polos-32.htm",
    "/Group/Outerwear-33.htm",
    "/Group/Ladies-Apparel-25.htm",
    "/Group/Polos-35.htm",
    "/Group/Dress-Shirts-34.htm",
    "/Group/Outerwear-36.htm",
    "/Group/Bags--Packaging-26.htm",
    "/Group/Kids-Premiums-27.htm",
    "/Group/Closeout-28.htm",
    "/Group/Gift-Certificates-140.htm"
  ];

  const results = [];

  for (const page of pages) {
    console.log("Fetching:", page);

    const res = await fetch(page, {
      credentials: "include" // important for logged-in session
    });

    const html = await res.text();
    const doc = new DOMParser().parseFromString(html, "text/html");

    const items = doc.querySelectorAll(".ProductResultEntry");

    items.forEach(item => {
      const nameEl = item.querySelector(".ProductName");
      const priceEl = item.querySelector(".itemActivePricing");
      const imgEl = item.querySelector(".thumbnail");
      const linkEl = item.querySelector(".ProductImage");

      if (!nameEl || !priceEl || !imgEl || !linkEl) return;

      const usd = parseFloat(priceEl.textContent.replace("$", "").trim());

      const product = {
        name: nameEl.textContent.trim(),
        usd: usd,
        bb: Math.ceil(usd),
        img: BASE_URL + imgEl.getAttribute("src"),
        new: false,
        url: BASE_URL + linkEl.getAttribute("href"),
        active: false
      };

      results.push(product);
    });
  }

  // 🔹 Remove duplicates by URL
  const unique = Object.values(
    results.reduce((acc, item) => {
      acc[item.url] = item;
      return acc;
    }, {})
  );

  console.log("Final JSON:", unique);

  // Optional: copy to clipboard
  await navigator.clipboard.writeText(JSON.stringify(unique, null, 2));
  console.log("Copied to clipboard ✅");
})();