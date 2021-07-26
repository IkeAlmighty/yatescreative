import Image from 'next/image'

export default ArtTile = ({imageURL})=> {
    const style = {
        padding: "20px"
    }
    return (
        <div>
            <div className={style}>
                <Image src={imageURL} />
            </div>
        </div>
    );
}