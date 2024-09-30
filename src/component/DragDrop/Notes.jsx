import { forwardRef } from "react";

const NotesItem = forwardRef(({ content, ...props }, ref) => {
    console.log(props);
    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                top: `${content?.position?.y}px`,
                left: `${content?.position?.x}px`,
                padding: 10,
                border: '1px solid black',
                background: 'yellow',
                cursor: 'grab',
            }}
            {...props}
        >
            <h1>
                {content.notes}
            </h1>
        </div>
    )
})
export default NotesItem