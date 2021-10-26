import React from "react";
import { Card, Col } from "react-bootstrap";
import { cutText, numberWithCommas } from "../utils/utils";
const Menus = ({ menu, addCart }) => {
  return (
    <Col md={4} sm={6}>
      <Card className="mb-4 rounded-0 shadow" onClick={() => addCart(menu)}>
        <Card.Img
          variant="top"
          src={
            "assets/images/" +
            menu.category.nama.toLowerCase() +
            "/" +
            menu.gambar
          }
          className="rounded-0 hight:100px"
        />
        <Card.Body>
          <h5>
            {cutText(menu.nama)} - {menu.kode}
          </h5>
          <Card.Text className="text-success">
            Rp.{numberWithCommas(menu.harga)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Menus;
