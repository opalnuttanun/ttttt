package com.team22.backend.Repository;
import com.team22.backend.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface CheckHistoryRepository extends JpaRepository<CheckHistory, Long>{
    CheckHistory findByCheckhistoryId(Long checkhistoryId);
}