const validateVoucher = () => {
  const validVoucherCodes = [
    {
      maxRedemptionCount: 1,
      code: "HELLOKBGANDA247",
      description:
        "the opportunity to transform into the best version of yourself at the salon of your choice!",
    },
    {
      maxRedemptionCount: 3,
      code: "ROYALRELAX",
      description: "a blissful massage experience fit for the Queen of Roses at any SPA of your choosing!",
    },
    {
      maxRedemptionCount: 1,
      code: "ENCHANTEDFEAST",
      description: "Enjoy an enchanted dining experience at the restaurant of your choice!",
    },
    {
      maxRedemptionCount: 1,
      code: "MIDASHANDS",
      description: "Enjoy the Midas Touch: Delight in a Manicure-Pedicure Fit for Royalty!",
    }
  ];


  const voucherCode = document.getElementById("voucherCode").value;
  const voucherMessage = document.getElementById("voucherMessage");

  const voucher = validVoucherCodes.find(
    (voucher) => voucher.code === voucherCode
  );

  if (voucher) {
    // Check local storage for the current redemption count of the voucher
    let currentRedemptionCount =
      parseInt(localStorage.getItem(voucher.code)) || 0;

    if (currentRedemptionCount < voucher.maxRedemptionCount) {
      // Increment the redemption count
      currentRedemptionCount++;

      if (
        currentRedemptionCount < voucher.maxRedemptionCount &&
        voucher.maxRedemptionCount > 1
      ) {
        voucherMessage.innerHTML = `You've successfully redeemed your voucher. <br><br>Enjoy ${voucher.description} <br><br>You can redeem it ${voucher.maxRedemptionCount - currentRedemptionCount} more times.`;
      } else if (currentRedemptionCount == voucher.maxRedemptionCount) {
        voucherMessage.innerHTML = `You've successfully redeemed your voucher. <br><br>Enjoy ${voucher.description}`;
      } else {
        voucherMessage.innerHTML = `This voucher has been fully redeemed.`
      }

      voucherMessage.classList.add("voucher-success");
      voucherMessage.style.opacity = 1;
      localStorage.setItem(voucher.code, currentRedemptionCount);
    } else {
      voucherMessage.innerHTML = "This voucher has been fully redeemed.";
      voucherMessage.classList.remove("voucher-success");
      voucherMessage.style.opacity = 1;
    }
  } else {
    voucherMessage.innerHTML = "Invalid voucher code. Please try again.";
    voucherMessage.classList.remove("voucher-success");
    voucherMessage.style.opacity = 1;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Parse query parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get('code');

  // Set the value of the input field if 'code' parameter exists
  if (codeParam) {
    document.getElementById("voucherCode").value = codeParam.toUpperCase();

    // Remove the 'code' parameter from the URL
    urlParams.delete('code');
    const newUrl = window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }

  document.getElementById("voucherForm").addEventListener("submit", (event) => {
    event.preventDefault();
    validateVoucher();
  });
});
