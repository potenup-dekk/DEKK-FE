import postPageStyle from "../style";

interface CategoryOption {
  id: string;
  label: string;
}

interface PostCategoryStepProps {
  primaryCategoryOptions: CategoryOption[];
  primaryCategoryId: string;
  selectedPrimaryCategoryLabel: string;
  secondaryCategoryOptions: string[];
  secondaryCategoryName: string;
  onPrimaryCategorySelect: (categoryId: string) => void;
  onSecondaryCategorySelect: (categoryName: string) => void;
}

const PostCategoryStep = ({
  primaryCategoryOptions,
  primaryCategoryId,
  selectedPrimaryCategoryLabel,
  secondaryCategoryOptions,
  secondaryCategoryName,
  onPrimaryCategorySelect,
  onSecondaryCategorySelect,
}: PostCategoryStepProps) => {
  const {
    section,
    categoryMeta,
    categoryMetaItem,
    categoryMetaTitle,
    categoryMetaValue,
    categoryOptionGroup,
    categoryOptionButton,
  } = postPageStyle();

  return (
    <section className={section()}>
      <div className={categoryMeta()}>
        <div className={categoryMetaItem()}>
          <p className={categoryMetaTitle({ categoryFocus: true })}>
            1차 카테고리
          </p>
          <p className={categoryMetaValue({ categoryFocus: true })}>
            {selectedPrimaryCategoryLabel}
          </p>
        </div>

        <div className={categoryMetaItem()}>
          <p
            className={categoryMetaTitle({
              categoryFocus: Boolean(primaryCategoryId),
            })}
          >
            2차 카테고리
          </p>
          <p
            className={categoryMetaValue({
              categoryFocus: Boolean(primaryCategoryId),
            })}
          >
            {secondaryCategoryName || "미선택"}
          </p>
        </div>
      </div>

      <div className={categoryOptionGroup()}>
        {primaryCategoryOptions.map((category) => {
          return (
            <button
              key={category.id}
              type="button"
              className={categoryOptionButton({
                optionSelected: primaryCategoryId === category.id,
              })}
              onClick={() => {
                onPrimaryCategorySelect(category.id);
              }}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      <div className={categoryOptionGroup()}>
        {secondaryCategoryOptions.map((categoryName) => {
          return (
            <button
              key={categoryName}
              type="button"
              className={categoryOptionButton({
                optionSelected: secondaryCategoryName === categoryName,
              })}
              onClick={() => {
                onSecondaryCategorySelect(categoryName);
              }}
              disabled={!primaryCategoryId}
            >
              {categoryName}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default PostCategoryStep;
