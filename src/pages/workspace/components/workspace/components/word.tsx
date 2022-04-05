import { Tooltip } from '@arco-design/web-react';
import { IconCloseCircle } from '@arco-design/web-react/icon';
import classNames from 'classnames';
import { FC } from 'react';
import { IWord } from '../type';

const Word: FC<IWord> = ({ text, type, color, field, isPlain, id, selectable, removeTag, position }) => {
    const className = classNames(
        ...[
            'word',
            {
                selectable: selectable && isPlain,
                tag: !isPlain
            }
        ]
    );

    return (
        <Tooltip mini disabled={isPlain} content={field} position="tr">
            <span
                className={className}
                style={!isPlain ? { background: color } : {}}
                data-id={id}
                data-linenumber={position.lineNumber}
            >
                {text}
                {!isPlain && (
                    <IconCloseCircle
                        className="icon"
                        onClick={() => {
                            removeTag(id);
                        }}
                    />
                )}
            </span>
        </Tooltip>
    );
};

export default Word;
