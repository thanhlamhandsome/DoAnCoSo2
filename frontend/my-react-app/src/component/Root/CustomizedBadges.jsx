import * as React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ItemShopingLayout from "../../layouts/ItemShopingLayout";
import { useDispatch, useSelector } from "react-redux";
import CheckoutModal from "./CheckoutModal";
import { uiAction } from "../../store/ui-slice";
import { red } from "@mui/material/colors";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function CustomizedBadges() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const showItemShoppingLayout = useSelector((state) => state.ui.showItemShoppingLayout);
  const showCheckoutModal = useSelector((state) => state.ui.showCheckoutModal);
  const dispatch = useDispatch();

  const toggleItemShoppingLayout = () => {
    if (showItemShoppingLayout) {
      dispatch(uiAction.hideShowItemShoppingLayout());
    } else {
      dispatch(uiAction.setShowItemShoppingLayout());
    }
  };

  const toggleCheckoutModal = () => {
    if (showCheckoutModal) {
      dispatch(uiAction.hideShowCheckoutModal());
    } else {
      dispatch(uiAction.setShowCheckoutModal());
    }
  };

  return (
    <>
      {/* Hiển thị layout nếu state là true */}
      {showItemShoppingLayout && <ItemShopingLayout />}
      {showCheckoutModal && <CheckoutModal />}
      {/* Button để kích hoạt hiển thị */}
      <IconButton onClick={toggleItemShoppingLayout} aria-label="cart">
        <StyledBadge badgeContent={totalQuantity} color="secondary">
          <ShoppingCartIcon />
        </StyledBadge>
      </IconButton>
      <button onClick={toggleCheckoutModal}>Toggle Checkout Modal</button>
    </>
  );
}
