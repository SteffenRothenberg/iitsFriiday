package Repository;

import Data.Album;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepoInterface extends MongoRepository<Album, String> {
}
