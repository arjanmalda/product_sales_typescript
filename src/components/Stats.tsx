import {
  StyledStats,
  TableHeader,
  SkeletonText,
  SkeletonImg,
  SkeletonNum,
} from "../styles/Stats.styled";
import React, { ChangeEvent } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { CgDanger } from "react-icons/cg";
import { Header } from "./Header";
import { useState, useEffect } from "react";

const merchantToken = process.env.REACT_APP_MERCHANT_KEY;
const partnerToken = process.env.REACT_APP_PARTNER_KEY;

export interface IState {
  orders: Array<{
    number: string;
    status: number;

    orderlines: Array<{
      type: string;
      quantity: number;
      description: string;
      articles: { id: number; description: string }[];
    }>;
  }>;
  products: Array<{
    id: number;
    uuid: string;
    name: string;
    description: string;
    short_description: string;
    sku: string;
    price: { default: string }[];
    stock: number;
    created_date: string;
    created_time: string;
    updated_date: string;
    updated_time: string;
    taxable: boolean;
    can_backorder: boolean;
    extra: {
      invisible: {
        weight: string;
      }[];
      visible: {
        barcode: string;
      }[];
    };

    categories: {
      category_id: number;
      article_url_id: number;
      is_active: boolean;
      is_main: boolean;
      position: number;
    }[];
    url: string;
    images: Array<{
      id: string;
      position: string;
      url: string;
      urls: { full: string; article: string; thumb: string };
    }>;
  }>;

  loading: boolean;
  handleChange?(event: React.ChangeEvent<HTMLSelectElement>): void;
}
// interface OrderProps {
//   props: IState["orders"];
// }

// interface ProductProps {
//   props: IState["products"];
// }

// interface LoadingProps {
//   props: IState["loading"];
// }

export const Stats = () => {
  const [shippedOrders, setShippedOrders] = useState<IState["orders"]>([]);
  const [paidOrders, setPaidOrders] = useState<IState["orders"]>([]);
  const [collectedOrders, setCollectedOrders] = useState<IState["orders"]>([]);
  const [products, setProducts] = useState<IState["products"]>([]);
  const [loading, setLoading] = useState<IState["loading"]>(true);
  // const [offsetShipped, setOffsetShipped] = useState(0);
  // const [offsetPaid, setOffsetPaid] = useState(0);
  // const [offsetCollected, setOffsetCollected] = useState(0);
  // const [offsetProducts, setOffsetProducts] = useState(0);

  function handleSelectChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setLoading(true);
    event.preventDefault();
    fetchData(event.target.value);
  }
  const fetchData = (period: string) => {
    getShippedOrders(period);
    getPaidOrders(period);
    getCollectedOrders(period);
    getProducts();
  };

  // useEffect(() => {
  //   fetchData("hello");
  // }, []);

  useEffect(() => {}, [shippedOrders]);

  const getShippedOrders = (period: string) => {
    fetch(
      `https://api.mijnwebwinkel.nl/v1/orders?format=json&token=${merchantToken}&partner_token=${partnerToken}&language=nl_NL&limit=50&status_id=2&${period}&offset=0&ordering=desc`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setShippedOrders(data);
        setLoading(false);
        // if(data.length === 50){
        //   setOffsetShipped(50);
        // } else {}
      });
  };

  const getPaidOrders = (period: string) => {
    fetch(
      `https://api.mijnwebwinkel.nl/v1/orders?format=json&token=${merchantToken}&partner_token=${partnerToken}&language=nl_NL&limit=50&status_id=3&${period}&offset=0&ordering=desc`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPaidOrders(data);

        setLoading(false);
      });
  };
  const getCollectedOrders = (period: string) => {
    fetch(
      `https://api.mijnwebwinkel.nl/v1/orders?format=json&token=${merchantToken}&partner_token=${partnerToken}&language=nl_NL&limit=50&status_id=6&${period}&offset=0&ordering=desc`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCollectedOrders(data);
        setLoading(false);
      });
  };
  const getProducts = () => {
    fetch(
      `https://api.mijnwebwinkel.nl/v1/articles?format=json&token=${merchantToken}&partner_token=${partnerToken}&language=nl_NL&offset=0&limit=50`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  // create one object from all imported orders
  const orders = [shippedOrders, paidOrders, collectedOrders].flat();

  return (
    <StyledStats>
      <Header
        orders={[]}
        products={[]}
        loading={false}
        handleChange={handleSelectChange}
      />
      <table>
        <thead>
          <TableHeader>
            <th>Product</th>
            <th></th>
            <th>
              Aantal
              <sup>
                <BsInfoCircle />
              </sup>
              <div>
                Deze aantallen zijn gebaseerd op orders met de status
                'Verzonden', 'Betaald' en 'Betaald & afgehaald'.
              </div>
            </th>
          </TableHeader>
        </thead>

        <ProductStats
          orders={orders}
          products={products}
          loading={loading}
          handleChange={function (event: ChangeEvent<HTMLSelectElement>): void {
            throw new Error("Function not implemented.");
          }}
        />
      </table>
    </StyledStats>
  );
};

export const ProductStats: React.FC<IState> = ({
  orders,
  products,
  loading,
}) => {
  // create object for products, count, images and id's
  let productStatsArray: {
    id: number;
    product: string;
    count: number;
    productId: number;
    image: string;
    url: string;
  }[] = [];
  const individualProductNames: string[] = [""];

  if (orders.length > 0) {
    for (let i = 0; i < orders.length; i++) {
      individualProductNames.push(orders[i].orderlines[0].description);
    }

    // check how many occurences per product in object
    const productCount = (arr: string[], val: string) =>
      arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

    for (let i = 0; i < orders.length; i++) {
      for (let j = 0; j < orders[i].orderlines.length; j++) {
        if (orders[i].orderlines[j].type === "article") {
          let quantity = orders[i].orderlines[j].quantity;
          productStatsArray.push({
            id: productStatsArray.length + 1,
            product: orders[i].orderlines[j].description,
            // count the number of o ccurences of a product + the quantity ordered (if quantity > 1)
            count:
              productCount(
                individualProductNames,
                orders[i].orderlines[0].description
              ) + quantity,
            productId: orders[i].orderlines[j].articles[0].id,
            image: "",
            url: "",
          });
        }
      }
    }

    // set image and url per product

    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < productStatsArray.length; j++) {
        // check whether the current product id corresponds to a product id that occurs in one of the fetched orders
        if (productStatsArray[j].productId === products[i].id) {
          productStatsArray[j].url =
            "https://www.mijnwebwinkel.nl/beheer/article/edit?categoryArticleId=" +
            products[i].categories[0].article_url_id;
          // check if image is present for current product
          if (products[i].images) {
            productStatsArray[j].image = products[i].images[0].urls.thumb;
          } else {
            productStatsArray[j].image =
              "https://cdn.myonlinestore.eu/bricks/illustration/no-image.svg";
          }
        }
      }
    }
  }

  //  filter duplicate products

  productStatsArray = productStatsArray.filter(
    (value, index, self): boolean =>
      index === self.findIndex((item) => item.product === value.product)
  );

  // Sort items from most sold to least sold
  productStatsArray.sort(function (a, b) {
    return b.count - a.count;
  });

  if (productStatsArray.length > 0 && loading === false) {
    return (
      <tbody>
        {productStatsArray.map((item) => (
          <tr key={item.id}>
            <td>
              <a href={item.url} target="_blank">
                {item.product}
              </a>
            </td>
            <td>
              <a href={item.url} target="_blank">
                <img src={item.image}></img>
              </a>
            </td>
            <td className="count">{item.count}</td>
          </tr>
        ))}
      </tbody>
    );
  } else if (productStatsArray.length > 0 && loading === true) {
    return (
      <tbody>
        <tr>
          <td>
            <SkeletonText />
          </td>
          <td>
            <SkeletonImg />
          </td>
          <td>
            <SkeletonNum />
          </td>
        </tr>
        <tr>
          <td>
            <SkeletonText />
          </td>
          <td>
            <SkeletonImg />
          </td>
          <td>
            <SkeletonNum />
          </td>
        </tr>
        <tr>
          <td>
            <SkeletonText />
          </td>
          <td>
            <SkeletonImg />
          </td>
          <td>
            <SkeletonNum />
          </td>
        </tr>
        <tr>
          <td>
            <SkeletonText />
          </td>
          <td>
            <SkeletonImg />
          </td>
          <td>
            <SkeletonNum />
          </td>
        </tr>
        <tr>
          <td>
            <SkeletonText />
          </td>
          <td>
            <SkeletonImg />
          </td>
          <td>
            <SkeletonNum />
          </td>
        </tr>
        <tr>
          <td>
            <SkeletonText />
          </td>
          <td>
            <SkeletonImg />
          </td>
          <td>
            <SkeletonNum />
          </td>
        </tr>
        <tr>
          <td>
            <SkeletonText />
          </td>
          <td>
            <SkeletonImg />
          </td>
          <td>
            <SkeletonNum />
          </td>
        </tr>
      </tbody>
    );
  } else {
    return (
      <tbody>
        <tr>
          <td className="noProductError">
            <CgDanger />
            Je hebt in deze periode geen producten verkocht. Lees{" "}
            <a
              href="https://www.mijnwebwinkel.nl/blog/meer-conversie-door-betere-productpaginas"
              target="_blank"
            >
              hier
            </a>{" "}
            meer over het verhogen van je conversie.
          </td>
        </tr>
      </tbody>
    );
  }
};
