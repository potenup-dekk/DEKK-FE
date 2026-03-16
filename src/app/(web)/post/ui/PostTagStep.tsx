import Tag from "@/shared/components/Badge";
import { ActionButton } from "@/shared/components/Button";
import InputField from "@/shared/components/Input";
import postPageStyle from "../style";

interface PostTagStepProps {
  tagInput: string;
  tags: string[];
  tagErrorMessage: string | null;
  onTagInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTagAdd: () => void;
  onTagRemove: (tag: string) => void;
}

const PostTagStep = ({
  tagInput,
  tags,
  tagErrorMessage,
  onTagInputChange,
  onTagAdd,
  onTagRemove,
}: PostTagStepProps) => {
  const {
    section,
    tagInputRow,
    tagInputWrap,
    divider,
    tagBadgeWrap,
    tagBadgeButton,
    tagRemoveText,
    errorText,
  } = postPageStyle();

  return (
    <section className={section()}>
      <div className={tagInputRow()}>
        <div className={tagInputWrap()}>
          <InputField
            id="post-tag-input"
            name="postTag"
            label="태그"
            placeholder="태그를 입력하세요"
            value={tagInput}
            onChange={onTagInputChange}
            hint="2~8글자, 공백 불가, 언더바(_) 허용"
          />
        </div>

        <ActionButton
          label="추가"
          color="secondary"
          size="md"
          className="mt-5"
          onClick={() => {
            onTagAdd();
          }}
        />
      </div>

      {tagErrorMessage ? (
        <p className={errorText()}>{tagErrorMessage}</p>
      ) : null}

      <div className={divider()} />

      <div className={tagBadgeWrap()}>
        {tags.map((tag) => {
          return (
            <button
              key={tag}
              type="button"
              className={tagBadgeButton()}
              onClick={() => {
                onTagRemove(tag);
              }}
            >
              <Tag label={tag} />
              <span className={tagRemoveText()}>삭제</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default PostTagStep;
