import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "./utils/constants";
import { Hasil, Listcategories, NavbarComponent, Menus } from "./components";
import Swal from "sweetalert2";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      selectedCategory: "Makanan",
      keranjang: [],
    };
    console.log("menjalankan constructor");
  }

  componentDidMount() {
    // Make a request for a user with a given ID
    axios
      .get(API_URL + "products?category.nama=" + this.state.selectedCategory)
      .then((res) => {
        console.log("response", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  changeCategory = (value) => {
    this.setState({
      selectedCategory: value,
      menus: [],
    });

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        console.log("response", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  addCart = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        //jika produk sudah ada dikernajang

        console.log(res.data.lenght);
        if (res.data.lenght === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Selamat",
                text: "Berhasil menambahkan " + keranjang.product.nama,
                showConfirmButton: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              // handle error
              Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Gagal menambahkan " + keranjang.product.nama,
                showConfirmButton: false,
                timer: 1000,
              });
              console.log(error);
            });
        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1, // mendapatkan jumlah produk - qty
            total_harga: res.data[0].total_harga * value.harga, //harga dikali jumlah produk
            product: value,
          };

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              Swal.fire({
                icon: "success",
                title: "Selamat",
                text: "Berhasil menambahkan " + keranjang.product.nama,
                showConfirmButton: false,
                timer: 1000,
              });
            })
            .catch((error) => {
              // handle error
              Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Gagal menambahkan " + keranjang.product.nama,
                showConfirmButton: false,
                timer: 1000,
              });
              console.log(error);
            });
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  render() {
    const { menus, selectedCategory } = this.state;
    return (
      <div>
        <NavbarComponent />
        <Container fluid>
          <Row className="py-3">
            <Listcategories
              changeCategory={this.changeCategory} //ini arrow function
              selectedCategory={selectedCategory} //ini state
            />
            <Col>
              <h6>
                <strong>Daftar Produk</strong>
              </h6>
              <hr />
              <Row className="overflow-auto">
                {menus &&
                  menus.map((menu) => (
                    <Menus key={menu.id} menu={menu} addCart={this.addCart} />
                  ))}
              </Row>
            </Col>
            <Hasil />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
