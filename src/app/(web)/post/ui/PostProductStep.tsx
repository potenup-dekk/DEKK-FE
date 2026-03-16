import { Trash2 } from "lucide-react";
import { ActionButton } from "@/shared/components/Button";
import InputField from "@/shared/components/Input";
import type { PostProductItem } from "../model/postForm.types";
import postPageStyle from "../style";

interface PostProductStepProps {
  productInput: string;
  products: PostProductItem[];
  productErrorMessage: string | null;
  onProductInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onProductAdd: () => void;
  onProductRemove: (productId: string) => void;
}

const PostProductStep = ({
  productInput,
  products,
  productErrorMessage,
  onProductInputChange,
  onProductAdd,
  onProductRemove,
}: PostProductStepProps) => {
  const {
    section,
    productList,
    productListEmpty,
    productItem,
    productImage,
    productMeta,
    productTitle,
    productDescription,
    productDeleteButton,
    divider,
    tagInputRow,
    tagInputWrap,
    errorText,
  } = postPageStyle();

  return (
    <section className={section()}>
      <div className={productList()}>
        {products.length ? (
          products.map((product) => {
            return (
              <div key={product.id} className={productItem()}>
                <img
                  src={product.imageUrl}
                  alt={`${product.title} 상품 썸네일`}
                  className={productImage()}
                />

                <div className={productMeta()}>
                  <p className={productTitle()}>{product.title}</p>
                  <p className={productDescription()}>{product.description}</p>
                </div>

                <button
                  type="button"
                  className={productDeleteButton()}
                  onClick={() => {
                    onProductRemove(product.id);
                  }}
                  aria-label={`${product.title} 삭제`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            );
          })
        ) : (
          <div className={productListEmpty()}>추가된 상품이 없습니다.</div>
        )}
      </div>

      <div className={divider()} />

      <div className={tagInputRow()}>
        <div className={tagInputWrap()}>
          <InputField
            id="post-product-input"
            name="postProduct"
            label="코디 상품"
            placeholder="상품명을 입력하세요"
            value={productInput}
            onChange={onProductInputChange}
          />
        </div>

        <ActionButton
          label="추가"
          color="secondary"
          size="md"
          className="mt-5"
          onClick={() => {
            onProductAdd();
          }}
        />
      </div>

      {productErrorMessage ? (
        <p className={errorText()}>{productErrorMessage}</p>
      ) : null}
    </section>
  );
};

export default PostProductStep;
